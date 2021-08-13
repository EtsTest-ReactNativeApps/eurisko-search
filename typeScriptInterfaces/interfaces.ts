export interface LocalData
  extends Array<{
    _id: string;
    lead_paragraph: string;
    headline: { main: string };
    multimedia: [{ url: string }] | [];
    web_url: string;
    type_of_material: string;
  }> {}

export interface Item {
  _id: string;
  lead_paragraph: string;
  headline: { main: string };
  multimedia: [{ url: string }] | [];
  web_url: string;
  type_of_material: string;
}
