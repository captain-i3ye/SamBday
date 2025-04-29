import { messages, type Message, type InsertMessage } from "@shared/schema";

// Storage interface with CRUD methods
export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // Message related methods
  getAllMessages(): Promise<Message[]>;
  getMessageById(id: number): Promise<Message | undefined>;
  getMessageBySpell(spell: string): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private messageStore: Map<number, Message>;
  private userCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.messageStore = new Map();
    this.userCurrentId = 1;
    this.messageCurrentId = 1;
    
    // Add seed data for the birthday messages
    this.seedMessages();
  }

  private seedMessages() {
    const seedMessages: InsertMessage[] = [
      {
        spell: "lumos",
        title: "The Light of My Life",
        content: "Just as Lumos illuminates the darkness, you bring light to my world every day. Your smile brightens even my darkest moments. On your birthday, I wish for your path to be filled with the warm glow of happiness and endless magical discoveries."
      },
      {
        spell: "accio",
        title: "Accio Happiness!",
        content: "You've summoned my heart from the very first day we met. No magic could be stronger than what draws me to you. May your birthday summon all the joy, laughter, and love you deserve!"
      },
      {
        spell: "revelio",
        title: "A Revealed Secret",
        content: "Revelio! Here's a secret I want to share: Every morning, I wake up grateful for another day with you in my life. Your birthday reveals another chapter in our story, and I can't wait to keep writing it with you."
      },
      {
        spell: "birthday",
        title: "Happy Birthday, My Love",
        content: "On your special day, I wish you a year filled with dreams come true, adventures that thrill, and magic in even the smallest moments. May your path be as clear as if guided by the Marauder's Map, and your heart as full as the Great Hall during a feast."
      }
    ];
    
    seedMessages.forEach(message => {
      this.createMessage(message);
    });
  }

  // User methods
  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Message methods
  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messageStore.values());
  }

  async getMessageById(id: number): Promise<Message | undefined> {
    return this.messageStore.get(id);
  }

  async getMessageBySpell(spell: string): Promise<Message | undefined> {
    return Array.from(this.messageStore.values()).find(
      (message) => message.spell === spell
    );
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    const message: Message = { ...insertMessage, id };
    this.messageStore.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
