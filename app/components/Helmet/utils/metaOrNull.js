import React from 'react'

export default function metaOrNull(name, content, predicate = true) {
  if (content && predicate) {
    return <meta name={name} content={content} />
  }

  return null
}
