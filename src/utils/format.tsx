import React from 'react';

export const renderWithLineBreaks = (text: string) =>
  text.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i !== text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));
