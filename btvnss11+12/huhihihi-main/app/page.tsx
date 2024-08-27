// b1
// import React from "react";

// async function fetchPosts() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   if (!res.ok) {
//     throw new Error("Failed to fetch posts");
//   }
//   return res.json();
// }

// export default async function PostsPage() {
//   const posts = await fetchPosts();

//   return (
//     <div>
//       <h1>Danh sách Bài viết</h1>
//       <ul>
//         {posts.map((post: { id: number; title: string; body: string }) => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.body.substring(0, 100)}...</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// b2
// import React from 'react';

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// async function fetchPost(id: string) {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch post');
//   }
//   return res.json();
// }

// interface PageProps {
//   params: { id: string };
// }

// export default async function PostDetailPage({ params }: PageProps) {
//   const { id } = params;

//   const post: Post = await fetchPost(id);

//   return (
//     <div>
//       <h1>Chi tiết Bài viết</h1>
//       <h2>{post.title}</h2>
//       <p>{post.body}</p>
//     </div>
//   );
// }

// b3
// import React, { useEffect, useState } from 'react';

// interface User {
//   id: number;
//   username: string;
// }

// export default function UserListPage() {
//   const [users, setUsers] = useState<User[]>([]);

//   useEffect(() => {
//     async function fetchUsers() {
//       const res = await fetch('https://jsonplaceholder.typicode.com/users');
//       if (!res.ok) {
//         throw new Error('Failed to fetch users');
//       }
//       const data: User[] = await res.json();
//       setUsers(data);
//     }

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h1>Danh sách Người dùng (CSR)</h1>
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>{user.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// b4

// import React, { useState, useEffect } from 'react';

// async function fetchPosts() {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//   if (!res.ok) {
//     throw new Error('Failed to fetch posts');
//   }
//   return res.json();
// }

// export default async function PostsPage() {
//   const initialPosts = await fetchPosts();

//   const [posts, setPosts] = useState(initialPosts);

//   const refreshPosts = async () => {
//     const refreshedPosts = await fetchPosts();
//     setPosts(refreshedPosts);
//   };

//   return (
//     <div>
//       <h1>Danh sách Bài viết với Refresh</h1>
//       <ul>
//         {posts.map((post: { id: number; title: string; body: string }) => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.body.substring(0, 100)}...</p>
//           </li>
//         ))}
//       </ul>
//       <button onClick={refreshPosts}>Refresh</button>
//     </div>
//   );
// }

// b5

// import React from "react";

// async function fetchPosts() {
//   try {
//     const res = await fetch(
//       "https://jsonplaceholder.typicode.com/nonexistent-url"
//     );
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw error;
//   }
// }

// export default async function ErrorHandlingPage() {
//   let posts = null;

//   try {
//     posts = await fetchPosts();
//   } catch (error) {
//     return (
//       <div>
//         <h1>Xử lý Lỗi với SSR</h1>
//         <p>Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Xử lý Lỗi với SSR</h1>
//       <ul>
//         {posts.map((post: { id: number; title: string; body: string }) => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.body.substring(0, 100)}...</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// b6

// import React, { useState, useEffect } from "react";

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }

// export default function PaginationPage() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 5;

//   useEffect(() => {
//     async function fetchPosts() {
//       const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//       if (!res.ok) {
//         throw new Error("Failed to fetch posts");
//       }
//       const data: Post[] = await res.json();
//       setPosts(data);
//     }

//     fetchPosts();
//   }, []);

//   const totalPages = Math.ceil(posts.length / postsPerPage);
//   const startIndex = (currentPage - 1) * postsPerPage;
//   const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div>
//       <h1>Phân Trang với CSR</h1>
//       <ul>
//         {currentPosts.map((post) => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.body.substring(0, 100)}...</p>
//           </li>
//         ))}
//       </ul>
//       <div>
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Previous
//         </button>
//         <span>
//           Page {currentPage} of {totalPages}
//         </span>
//         <button onClick={handleNextPage} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
