export interface UploadImageResponse {
  url: string
}

export interface TablePost {
  teamId?: string;
  before: string;
  after: string;
  url?: string;
  name?: string;
}