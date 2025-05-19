// TechBlogForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const categories = ["AI", "Frontend", "Backend", "DevOps", "Architecture", "Database", "Engineering", "기타"]

const BlogAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('')
  const [url, setUrl] = useState('')
  const [createDate, setCreateDate] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      company_name: companyName,
      thumbnail,
      category,
      url,
      create_date: createDate
    };

    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/blog/add`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('등록 성공!');
    } catch (err) {
      console.error(err);
      alert('등록 실패');
    }
  };


  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>기술 블로그 추가</h2>

      <div>
        <label>제목:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div>
        <label>간단 소개:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label>회사 이름:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>썸네일 이미지:</label>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>카테고리:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>카테고리를 선택하세요</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>생성일:</label>
        <input
          type="text"
          value={createDate}
          onChange={(e) => setCreateDate(e.target.value)}
          required
        />
      </div>

      <button type="submit">등록하기</button>
    </form>
  );
};

export default BlogAdd;
