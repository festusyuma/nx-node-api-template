
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum ChannelMemberRole {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    MEMBER = "MEMBER"
}

export enum ChannelAccess {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}

export interface NewChannel {
    id?: Nullable<string>;
    name: string;
    access?: Nullable<ChannelAccess>;
}

export interface NewMessage {
    message: string;
    channelId: string;
    profileId?: Nullable<string>;
}

export interface NewProfile {
    id?: Nullable<string>;
    email?: Nullable<string>;
    displayName: string;
    profileImage?: Nullable<string>;
}

export interface NewChannelMember {
    profileId?: Nullable<string>;
    channelId: string;
    role: ChannelMemberRole;
}

export interface Channel {
    id: string;
    name: string;
    access: ChannelAccess;
}

export interface Message {
    id: string;
    message: string;
    channelId: string;
    channel: Channel;
    profileId: string;
    sender: ChannelMember;
}

export interface Profile {
    id: string;
    email: string;
    displayName: string;
    profileImage?: Nullable<string>;
}

export interface ChannelMember {
    id: string;
    profileId: string;
    profile: Profile;
    channelId: string;
    channel: Channel;
    role?: Nullable<ChannelMemberRole>;
}

export interface PaginatedChannelMembers {
    members?: Nullable<ChannelMember[]>;
    nextToken?: Nullable<string>;
}

export interface PaginatedProfileChannels {
    channels?: Nullable<ChannelMember[]>;
    nextToken?: Nullable<string>;
}

export interface PaginatedChannelMessages {
    messages?: Nullable<Message[]>;
    nextToken?: Nullable<string>;
}

export interface IQuery {
    getMessagesByChannel(channelId: string, limit?: Nullable<number>, nextToken?: Nullable<string>): PaginatedChannelMessages | Promise<PaginatedChannelMessages>;
    getChannelsByProfile(limit?: Nullable<number>, nextToken?: Nullable<string>): PaginatedProfileChannels | Promise<PaginatedProfileChannels>;
    getMembersByChannel(channelId?: Nullable<string>, limit?: Nullable<number>, nextToken?: Nullable<string>): PaginatedChannelMembers | Promise<PaginatedChannelMembers>;
    getChannel(id: string): Nullable<Channel> | Promise<Nullable<Channel>>;
    getProfile(id?: Nullable<string>): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export interface IMutation {
    createChannel(input: NewChannel): Nullable<Channel> | Promise<Nullable<Channel>>;
    createProfile(input?: Nullable<NewProfile>): Nullable<Profile> | Promise<Nullable<Profile>>;
    createChannelMember(input?: Nullable<NewChannelMember>): Nullable<ChannelMember> | Promise<Nullable<ChannelMember>>;
    createMessage(input: NewMessage): Nullable<Message> | Promise<Nullable<Message>>;
}

type Nullable<T> = T | null;
