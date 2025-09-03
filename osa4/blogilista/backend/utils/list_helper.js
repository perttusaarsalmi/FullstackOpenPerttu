const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog?.likes ?? 0), 0)
}

const favouriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  return blogs.reduce((max, blog) => {
    return (blog.likes || 0) > (max.likes || 0) ? blog : max
  }, blogs[0])
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}
