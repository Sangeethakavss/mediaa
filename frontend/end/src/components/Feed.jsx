import React, { useState, useEffect } from 'react';
import {Box,Card,CardContent,Typography,Button,TextField,IconButton,Collapse,Grid,} from '@mui/material';
import { MdThumbUp, MdSend, MdExpandMore, MdExpandLess, MdDelete } from 'react-icons/md';
import feed from '../assets/img2.jpeg'; 
const displayNames = {
  User1: 'kaviya',
  User2: 'mercy',
};
const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [commentText, setCommentText] = useState({});
  const [expandedPosts, setExpandedPosts] = useState({});
   useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3001/posts');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };
  const handleLike = async (postId) => {
    try {
      await fetch(`http://localhost:3001/posts/like/${postId}`, { method: 'POST' });
      fetchPosts();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };
  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:3001/posts/${postId}`, { method: 'DELETE' });
      fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };
 const handleComment = async (postId) => {
    if (!commentText[postId]) return;
    try {
      await fetch(`http://localhost:3001/posts/comment/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: commentText[postId] }),
      });
      setCommentText({ ...commentText, [postId]: '' });
      fetchPosts();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };
 const handleNewPost = async () => {
    try {
      await fetch('http://localhost:3001/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPostContent, imageUrl: newPostImage }),
      });
      setNewPostContent('');
      setNewPostImage('');
      fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };
  const toggleExpand = (postId) => {
    setExpandedPosts({ ...expandedPosts, [postId]: !expandedPosts[postId] });
  };
 const getDisplayName = (username) => displayNames[username] || username;
 return (
    <Box
      sx={{
        backgroundImage: `url(${feed})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        py: 4,
      }}
    >
     <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 2, p: 3, mx: { xs: 2, md: 4 } }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#0D47A1', fontWeight: 'bold' }}>
          Motivational Feed
        </Typography>

        <Grid container spacing={3}>
         <Grid item xs={12} md={4}>
            <Card sx={{background: 'linear-gradient(135deg, #FFECB3, #FFE082)',border: '2px solid #FFB300',borderRadius: '16px',boxShadow: '0 8px 16px rgba(0,0,0,0.2)', p: 2,}}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 2, color: '#BF360C' }}>
                  Create Post
                </Typography>
                <TextField
                  fullWidth
                  label="Share your thoughts & queries..."
                  variant="outlined"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  multiline
                  rows={4}
                  sx={{ mb: 2, backgroundColor: '#fff', borderRadius: '8px' }}/>
              
                <Button variant="contained" color="primary" onClick={handleNewPost} sx={{ width: '100%' }}>
                  Post
                </Button>
              </CardContent>
            </Card>
          </Grid>
  <Grid item xs={12} md={8}>
            {posts.map((post) => (
              <Card
                key={post._id}
                sx={{
                  mb: 4,
                  background: 'linear-gradient(135deg, #E1F5FE, #B3E5FC)',
                  border: '2px solid #039BE5',
                  borderRadius: '16px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                }}
              >
                <CardContent>
 <Typography variant="h6" sx={{ color: '#0277BD', fontWeight: 'bold' }}>
                    {getDisplayName(post.user)}
                  </Typography>
         <Typography variant="body1" sx={{ mb: 2 }}>
                    {post.content.substring(0, 100)}
                    {post.content.length > 100 ? '...' : ''}
                  </Typography>
                  {post.imageUrl && (
                    <Box
                      component="img"
                      src={post.imageUrl}
                      alt="Post"
                      sx={{ width: '100%', borderRadius: '8px', mb: 2 }}
                    />
                  )} <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <IconButton onClick={() => handleLike(post._id)} sx={{ color: '#D32F2F' }}>
                      <MdThumbUp />
                    </IconButton>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      {post.likes}
                    </Typography>
                    <Button onClick={() => toggleExpand(post._id)} sx={{ ml: 'auto', color: '#0D47A1' }}>
                      {expandedPosts[post._id] ? <MdExpandLess /> : <MdExpandMore />} Details
                    </Button>
                    <IconButton onClick={() => handleDelete(post._id)} sx={{ ml: 1, color: 'red' }}>
                      <MdDelete />
                    </IconButton>
                  </Box>

                  <Collapse in={expandedPosts[post._id]} timeout="auto" unmountOnExit>
                    <Box sx={{ mt: 2, pl: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        Full Post:
                      </Typography>
                      <Typography variant="body1">{post.content}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        Posted on: {new Date(post.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Collapse>

                  {post.comments.length > 0 && (
                    <Box sx={{ mt: 2, pl: 1 }}>
                      {post.comments.map((comment, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#D32F2F' }}>
                            {getDisplayName(comment.username)}:
                          </Typography>
                          <Typography variant="body2">{comment.comment}</Typography>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Add a comment..."
                      value={commentText[post._id] || ''}
                      onChange={(e) =>
                        setCommentText({ ...commentText, [post._id]: e.target.value })
                      }
                      sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                    />
                    <IconButton onClick={() => handleComment(post._id)} sx={{ color: '#0D47A1' }}>
                      <MdSend />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FeedPage;

