import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h2>About Canada Weather</h2>
      <p>
        Canada Weather is a weather application that provides current weather information, forecasts, and more for cities in Canada.
        Stay updated with the latest weather conditions wherever you go in Canada!
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
};

export default About;
