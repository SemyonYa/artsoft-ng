export class MessageResponse {
    id: number;
    parentId?: number;
    datetime: Date;
    authorName: string;
    body: string;

    children: MessageResponse[];
    level: number;

    constructor(
        id: number,
        parentId: number,
        datetime: string,
        authorName: string,
        body: string,
        level: number = 0,
    ) {
        this.id = id;
        this.parentId = parentId;
        this.datetime = new Date(datetime);
        this.authorName = authorName;
        this.body = body;
        this.level = level;
        this.children = [];
    }

    setId(id: number) {
        this.id = id;
    }

    setLevel(level: number) {
        this.level = level;
    }
}