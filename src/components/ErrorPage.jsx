import React from 'react'

function ErrorPage({errorMessage}) {
  return (
    <div className='article_list'>
        <h2>ERROR: {errorMessage}</h2>
    </div>
  )
}

export default ErrorPage