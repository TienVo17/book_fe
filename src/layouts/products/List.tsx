import React from "react";
import BookProps from "./components/BookProps";
import Book from "../../models/Book";

const List: React.FC = () => {
  const books: Book[] = [
    {
      id: 1,
      tittle: "Hướng dẫn lập trình NodeJS",
      description: "Hướng dẫn cơ bản về Angular dành cho người mới",
      originalPrice: 400000,
      price: 23333,
      imageURL: '/image/books/sach1.jpg',
    },
    {
      id: 2,
      tittle: "Hướng dẫn lập trình Java",
      description: "Hướng dẫn cơ bản về Angular dành cho người mới",
      originalPrice: 11111,
      price: 33333,
      imageURL: '/image/books/sach2.jpg',
    },
    {
      id: 3,
      tittle: "Hướng dẫn lập trình Python",
      description: "Hướng dẫn cơ bản về Angular dành cho người mới",
      originalPrice: 22222,
      price: 66666,
      imageURL: '/image/books/sach3.jpg',
    },
  ];
  return (
    <div className="container">
      <div className="row mt-4">
        {books.map((book) => (
          <BookProps key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};
export default List;
