import React from 'react';

interface PaperPlaneProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  theme?: 'light' | 'dark';
}

const PaperPlane: React.FC<PaperPlaneProps> = ({
  size = 24,
  className = '',
  theme = 'dark',
  ...props
}) => {
  const isDark = theme === 'dark';
  const fillColor = isDark ? '#000000' : '#ffffff';
  return (
    <svg className={className} {...props}  height="18" width="18" viewBox="0 0 18 18"><title>paper plane 2</title><g fill={fillColor} className="nc-icon-wrapper"><path d="M16.345,1.654c-.344-.344-.845-.463-1.305-.315L2.117,5.493c-.491,.158-.831,.574-.887,1.087-.056,.512,.187,.992,.632,1.251l4.576,2.669,3.953-3.954c.293-.293,.768-.293,1.061,0s.293,.768,0,1.061l-3.954,3.954,2.669,4.576c.235,.402,.65,.639,1.107,.639,.048,0,.097-.003,.146-.008,.512-.056,.929-.396,1.086-.886L16.661,2.96h0c.148-.463,.027-.963-.316-1.306Z" fill={fillColor}></path></g></svg>
  );
};

export default PaperPlane;
