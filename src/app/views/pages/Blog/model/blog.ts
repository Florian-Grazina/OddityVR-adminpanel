export interface Blog {
};

export interface FormAuthor {
    Name: string,
    FirstName: string
};

export interface Author {
    ID: number,
    Name: string,
    FirstName: string,
    CreationDate: Date,
    Sex: string
}

export interface Article {
    ID: number,
    Title: string,
    Date: Date,
    Content: string,
    Name: string,
    FirstName: string,
    Author: number
}

export interface FormUser{
    Email: string,
    Password: string,
    Age: number
}

export interface User{
    ID: number,
    Email: string,
    Password: string,
    Age: number
}