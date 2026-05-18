import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface FetchNotesParams {
  search: string;
  page: number;
  perPage: number;
}

interface FetchNotesResponse{
    notes: Note[];
    totalPages: number;
}

interface CreateNoteParams{
    title: string;
    content: string;
    tag: NoteTag;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async ({
    search,
    page,
    perPage,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>(
        'https://notehub-public.goit.study/api/notes',
        {
            params: {
                search,
                page,
                perPage
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

export const createNote = async (newNote: CreateNoteParams): Promise<Note> => { 
    const response = await axios.post<Note>('https://notehub-public.goit.study/api/notes',
        newNote,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }   
    )

    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => { 
    const response = await axios.delete<Note>(
        `https://notehub-public.goit.study/api/notes/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    return response.data;
};