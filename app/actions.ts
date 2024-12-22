"use server";

import { encodedRedirect } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache';
import { Boards } from "@/types/supabase";
import { TLSessionStateSnapshot, TLStoreSnapshot } from "@tldraw/editor";
import type { Database as GeneratedDatabase } from '@/types/supabase';


// 扩展 Supabase 生成的类型
interface Database extends GeneratedDatabase {
  public: {
    Tables: {
      boards: {
        Row: GeneratedDatabase['public']['Tables']['boards']['Row'] & {
          tldraw_document: TLStoreSnapshot;
          tldraw_session: TLSessionStateSnapshot;
        };
        Insert: GeneratedDatabase['public']['Tables']['boards']['Insert'] & {
          tldraw_document?: TLStoreSnapshot;
          tldraw_session?: TLSessionStateSnapshot;
        };
        Update: GeneratedDatabase['public']['Tables']['boards']['Update'] & {
          tldraw_document?: TLStoreSnapshot;
          tldraw_session?: TLSessionStateSnapshot;
        };
        Relationships: GeneratedDatabase['public']['Tables']['boards']['Relationships'];
      };
    } & Omit<GeneratedDatabase['public']['Tables'], 'boards'>;
  } & Omit<GeneratedDatabase['public'], 'Tables'>;
}



export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match",
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const signInWithGitHub = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirect_to=/dashboard`
    }
  });

  if (error) {
    console.error("signInWithGitHub error", error);
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect(data.url);
};

export async function createBoard() {
  const supabase = await createClient();

  // 获取当前用户
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("unauthorized");
  }

  // 创建新board
  const { data: board, error } = await supabase
    .from('boards')
    .insert({
      user_id: user.id,
      name: 'untitled',
      description: '',
      is_public: false,
      is_favorite: false,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // 重新验证dashboard页面
  revalidatePath('/dashboard');

  return board;
}

// fetch all boards belong to the user
export async function fetchAllBoards() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("unauthorized");
  }

  // fetch all boards belong to the user
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}


// fetch all boards belong to the user and marked as favorite
export async function fetchAllFavoriteBoards() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("unauthorized");
  }

  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_favorite', true)
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// fetch boards updated in the last 7 days
export async function fetchBoardsUpdatedInLast7Days() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("unauthorized");
  }

  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('user_id', user.id)
    .gte('updated_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('updated_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


// add a board to favorite
export async function addBoardToFavorite(boardId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boards')
    .update({ is_favorite: true })
    .eq('id', boardId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// remove a board from favorite
export async function removeBoardFromFavorite(boardId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boards')
    .update({ is_favorite: false })
    .eq('id', boardId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function saveDocumentState(documentId: Boards['id'], document: TLStoreSnapshot) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('boards')
    .update({ tldraw_document: JSON.stringify(document) })
    .eq('id', documentId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function saveSessionState(documentId: Boards['id'], userId: Boards['user_id'], session: TLSessionStateSnapshot) {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('boards')
    .update({ tldraw_session: JSON.stringify(session) })
    .eq('id', documentId)
    .eq('user_id', userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


export async function loadDocumentState(documentId: Boards['id']) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boards')
    .select('tldraw_document')
    .eq('id', documentId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function loadSessionState(documentId: Boards['id'], userId: Boards['user_id']) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('boards')
    .select('tldraw_session')
    .eq('id', documentId)
    .eq('user_id', userId)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
}
