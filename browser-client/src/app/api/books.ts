import {AuthorData} from "./authors";
import {APIResponseEnvelope} from "./envelope";
import {getAPIHost} from "./api-host";

export type BookData = {
  id: number,
  title: string,
  author: AuthorData
};

export type GetAllBooksAPIResponse = APIResponseEnvelope<BookData[]>;

export async function getAllBooks(): Promise<GetAllBooksAPIResponse> {
  try {
    const resp = await fetch(`${getAPIHost()}/books`);
    const json = await resp.json();
    return json;
  } catch (e) {
    throw e;
  }
}

