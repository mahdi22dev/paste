export interface ServerError {
  statusCode: number;
  timestamp: string;
  path: string;
  message: Message;
}

export interface Message {
  message: string;
  error: string;
  statusCode: number;
}
