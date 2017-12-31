import React from 'react'

export default function scriptTag(scheme) {
  return <script type="application/ld+json">{`${scheme}`}</script>
}
