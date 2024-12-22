"use client";

import { loadDocumentState, loadSessionState, saveSessionState } from "@/app/actions";
import { saveDocumentState } from "@/app/actions";
import { getSnapshot, loadSnapshot, Tldraw, TLSessionStateSnapshot, TLStoreSnapshot, useEditor } from "tldraw";
import 'tldraw/tldraw.css';

import type { Boards } from "@/types/supabase";

interface TldrawWrapperProps {
  boardId: string;
  userId: string;
}


export const TldrawWrapper = ({ boardId, userId }: TldrawWrapperProps) => {

  return (

    <>
      <div className="flex flex-row gap-2" style={{ position: "fixed", top: 40, left: 0, right: 0, bottom: 0 }}>
        <Tldraw>
          <SaveButton documentId={boardId} userId={userId} />
          <LoadButton documentId={boardId} userId={userId} />
        </Tldraw>
      </div>
    </>
  );
};


function SaveButton({ documentId, userId }: { documentId: Boards["id"], userId: Boards["user_id"]; }) {
  const editor = useEditor();

  const handleSave = async () => {
    const { document, session } = getSnapshot(editor.store);
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