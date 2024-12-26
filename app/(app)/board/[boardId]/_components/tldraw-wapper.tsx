"use client";

export const revalidate = 0;

import {
  createTLStore,
  defaultShapeUtils,
  getSnapshot,
  loadSnapshot,
  Tldraw,
  TLSessionStateSnapshot,
  TLStoreSnapshot,
  useEditor,
  TLAnyShapeUtilConstructor,
  TLStoreWithStatus,
  TLRecord,
  RecordsDiff
} from "tldraw";
import { loadDocumentState, loadSessionState, saveDocumentState, saveSessionState } from "@/app/actions";
import 'tldraw/tldraw.css';

import type { Boards } from "@/types/supabase";
import { useEffect } from "react";

interface TldrawWrapperProps {
  boardId: string;
  userId: string;
  shapeUtils?: TLAnyShapeUtilConstructor[];
}


export const TldrawWrapper = ({ boardId, userId, shapeUtils = [] }: TldrawWrapperProps) => {

  return (
    <>
      <div className="flex flex-row gap-2" style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
        <Tldraw>
          {/* <SaveButton documentId={boardId} userId={userId} /> */}
          {/* <LoadButton documentId={boardId} userId={userId} /> */}
          <AutoLoad documentId={boardId} userId={userId} />
          <AutoSave documentId={boardId} userId={userId} />
        </Tldraw>
      </div>
    </>
  );
};

function AutoSave({ documentId, userId }: { documentId: string, userId: string; }) {
  // TODO: show saving status

  const handleSave = async () => {
    const { document, session } = getSnapshot(editor.store);
    // If you are building a multi-user app, you probably want to store
    // the document and session states separately because the
    // session state is user-specific and normally shouldn't be shared.
    await saveDocumentState(documentId, document);
    await saveSessionState(documentId, userId, session);
  };


  const editor = useEditor();
  useEffect(() => {
    // TODO: batch updates
    const unlisten = editor.store.listen(
      (update) => {
        console.log('update', update)
        handleSave();
      },
      { scope: 'document', source: 'user' }
    )
  }, []);

  return null;
  
}

function AutoLoad({ documentId, userId }: { documentId: string, userId: string; }) {
  const editor = useEditor();
  const handleLoad = async () => {
    const document = await loadDocumentState(documentId);
    const session = await loadSessionState(documentId, userId);
    editor.setCurrentTool('select'); // need to reset tool state separately
    loadSnapshot(editor.store, {
      document: JSON.parse(document.tldraw_document as string) as TLStoreSnapshot,
      session: JSON.parse(session.tldraw_session as string) as TLSessionStateSnapshot
    });
  };

  useEffect(() => {
    handleLoad();
  }, [documentId, userId]);

  return null;
}


function SaveButton({ documentId, userId }: { documentId: Boards["id"], userId: Boards["user_id"]; }) {
  const editor = useEditor();

  const handleSave = async () => {
    const { document, session } = getSnapshot(editor.store);
    console.log("save", { document, session })
    // If you are building a multi-user app, you probably want to store
    // the document and session states separately because the
    // session state is user-specific and normally shouldn't be shared.
    await saveDocumentState(documentId, document);
    await saveSessionState(documentId, userId, session);
  };

  return (
    <button
      style={{ position: "fixed", top: 0 }}
      onClick={handleSave}
    >
      Save
    </button>
  );
}

function LoadButton({ documentId, userId }: { documentId: string, userId: string; }) {
  const editor = useEditor();
  const handleLoad = async () => {
    const document = await loadDocumentState(documentId);
    const session = await loadSessionState(documentId, userId);
    editor.setCurrentTool('select'); // need to reset tool state separately
    loadSnapshot(editor.store, {
      document: JSON.parse(document.tldraw_document as string) as TLStoreSnapshot,
      session: JSON.parse(session.tldraw_session as string) as TLSessionStateSnapshot
    });
  };


  return (
    <button
      style={{ position: "fixed", top: 0, left: 60 }}
      onClick={handleLoad}
    >
      Load
    </button>
  );
}