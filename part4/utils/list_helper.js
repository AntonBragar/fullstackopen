const _ = require('lodash')

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const total = blogs.reduce((sum, blog) => {
		return sum + blog.likes
	}, 0)
	return total
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0) {
		return null
	}
	const favorite = blogs.reduce((maxBlog, blog) => {
		return blog.likes > maxBlog.likes ? blog : maxBlog
	}, blogs[0])

	const favBlog = {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	}

	return favBlog
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	const authorCounts = _.countBy(blogs, 'author')

	const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author])
	return {
		author: topAuthor,
		blogs: authorCounts[topAuthor],
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null
	}

	const authorLikes = {}

	blogs.forEach((blog) => {
		const author = blog.author
		const likes = blog.likes
		if(authorLikes[author]) {
			authorLikes[author] += likes
		} else {
			authorLikes[author] = likes
		}
	})

	console.log(authorLikes)
	let topAuthor = ''
	let maxLikes = 0

	for (const author in authorLikes) {
		if (authorLikes[author] > maxLikes) {
			topAuthor = author
			maxLikes = authorLikes[author]
		}
	}

	return {
		author: topAuthor,
		likes: maxLikes
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}