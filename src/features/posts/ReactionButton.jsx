import React from 'react'
import { useAddReactionMutation } from './postsSlice'

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButton = ({post}) => {
    const [addReaction] = useAddReactionMutation()
    const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji],index) => {
        return (
            <button
            key={index}
            type='button'
            className='reactionButton'
            onClick={() => {
                const newValue = post.reactions[name] + 1;
                addReaction({postId: post.id, reactions: {...post.reactions, [name]: newValue}})
            }}
            >
                {emoji}{post.reactions[name]}
            </button>
        )
        })
  return (
    <div>{reactionButtons}</div>
  )
}

export default ReactionButton