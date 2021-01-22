export class MessageResponse {
    id: number;
    parentId: number;
    datetime: Date;
    authorName: string;
    body: string;
    children: MessageResponse[];

    constructor(
        id: number,
        parentId: number,
        datetime: string,
        authorName: string,
        body: string,
    ) {
        this.id = id;
        this.parentId = parentId;
        this.datetime = new Date(datetime);
        this.authorName = authorName;
        this.body = body;
        this.children = [];
    }
}