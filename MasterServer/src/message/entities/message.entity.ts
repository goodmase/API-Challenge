import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';
export interface MessageEntity extends InMemoryDBEntity {
    name: string;
    message: string;
}