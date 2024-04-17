import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createMember, updateMember } from '../../api/memberData';

const initialState = {
  name: '',
  role: '',
  image: '',
};

export default function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} fighter</h2>

      {/* NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* ROLE SELECT  */}
      <FloatingLabel controlId="floatingSelect" label="Role">
        <Form.Select
          aria-label="Role"
          name="role"
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select an archetype</option>
          <option value="All-rounder">All-rounder</option>
          <option value="Rushdown">Rushdown</option>
          <option value="Pressurer">Pressurer</option>
          <option value="Hit & Run">Hit & Run</option>
          <option value="Mix-up">Mix-up</option>
          <option value="Zone-breaker">Zone-breaker</option>
          <option value="Dominating">Dominating</option>
          <option value="Powerhouse">Powerhouse</option>
          <option value="Footsies">Footsies</option>
          <option value="Glass Cannon">Glass Cannon</option>
          <option value="Tag Team">Tag Team</option>
          <option value="Zoner">Zoner</option>
          <option value="Bait & Punish">Bait & Punish</option>
          <option value="Trapper">Trapper</option>
          <option value="Turtle">Turtle</option>
          <option value="Keep Away">Keep Away</option>
          <option value="Stage Control">Stage Control</option>
          <option value="Half-grappler">Half-grappler</option>
          <option value="Half-healer">Half-healer</option>
          <option value="Dynamic">Dynamic</option>
          <option value="Aura">Aura</option>
          <option value="First Strike">First Strike</option>
          <option value="Precision">Precision</option>
        </Form.Select>
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} fighter</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
