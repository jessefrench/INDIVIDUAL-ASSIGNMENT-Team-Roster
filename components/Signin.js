import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

export default function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ color: 'white' }}>Hi there!</h1>
      <p style={{ color: 'white' }}>Click the button below to login!</p>
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}
