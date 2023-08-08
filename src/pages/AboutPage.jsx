import React from 'react'
import Card from '../components/shared/Card'
function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About this Project</h1>
        <p>Reach app to leave feedback for a service </p>
        <p>Version : 1.1.1</p>
        <a href="/">Goto Home</a>
      </div>
    </Card>
  )
}

export default AboutPage