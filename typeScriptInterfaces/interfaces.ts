export interface Data {
  response: {
    docs: [];
  };
}

export interface LocalData
  extends Array<{
    _id: string;
    lead_paragraph: string;
    headline: { main: string };
    multimedia: [{ url: string }];
  }> {}

export interface Item {
  _id: string;
  lead_paragraph: string;
  headline: { main: string };
  multimedia: [{ url: string }];
}
