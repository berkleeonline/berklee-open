import React, { useRef, useEffect, MutableRefObject } from 'react';

type StripProps = {
  text: string;
}

const Strip = (props: StripProps) => {
  return (
    <div className="bg-black py-2 px-4 text-white font-accent uppercase tracking-widest text-sm">Campuses and Schools</div>
  );
};

export default Strip;