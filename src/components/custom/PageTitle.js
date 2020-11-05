import React from 'react';
import ContentEditable from 'react-contenteditable';

const PageTitle = ({ title, center, editMode, onChange, onBlur, style }) => {
  return (
    <div className={`my-3 ${center ? 'text-center' : ''}`}>
      {
        {
          true: (
            <ContentEditable
              innerRef={React.createRef()}
              html={title}
              disabled={false}
              onChange={onChange}
              tagName="h1"
              onBlur={onBlur}
              style={style}
            />
          ),
          false: (
            <ContentEditable
              html={title}
              disabled={true}
              tagName="h2"
              style={style}
            />
          ),
        }[editMode === 'true']
      }
    </div>
  );
};

export default PageTitle;
