import React, { useState, useRef, useEffect } from 'react';
import { useField, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import api from '../../services/api';

import { Container } from './styles';

import sample_default from '../../assets/cam.jpg';

import translate from '../../locales';

export default function ImageInput({ height, width }) {
  const { defaultValue, registerField } = useField('image');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'image_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  async function handleChange(e) {
    try {
      const data = new FormData();

      data.append('file', e.target.files[0]);

      const response = await api.post('files', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      toast.error(translate('upload_image_error'));
    }
  }

  return (
    <Container>
      <label htmlFor="image">
        <img
          id="image-container"
          height={height}
          width={width}
          src={preview || sample_default}
          alt=""
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type="file"
            id="image"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
            ref={ref}
          />
          <Input type="hidden" name="image_id" value={file} />
        </div>
      </label>
    </Container>
  );
}

ImageInput.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

ImageInput.defaultProps = {
  height: 800,
  width: 400,
};
