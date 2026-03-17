export interface Toast{
    status: 'S'|'E'|'I'| null;
    message:string;
    visible:boolean;
}