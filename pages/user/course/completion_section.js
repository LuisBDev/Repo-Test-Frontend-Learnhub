import React, { useEffect } from "react";
const adjustSVGSize = () => {
    const svgElement = document.querySelector('.donut-svg');
    if (svgElement) {
      const containerWidth = svgElement.parentElement.offsetWidth;
      const desiredWidth = Math.min(containerWidth, 200); // Adjust the desired width and max-width values to match the CSS
      svgElement.setAttribute('width', `${desiredWidth}px`);
    }
  };

const CompletionSection = ({ completionPercentage=0 }) => {
    const completeDashArray = `${completionPercentage} ${100 - completionPercentage}`;
    const incompleteDashArray = `100 0`;

    useEffect(() => {
      adjustSVGSize();
      window.addEventListener('resize', adjustSVGSize);
      return () => {
        window.removeEventListener('resize', adjustSVGSize);
      };
    }, []);

    return (
      <section className="text-dark-700 mb-4 rounded raised-card p-4">
      <div className="row w-100 m-0">
        <div className="col-12 col-sm-6 col-md-7 p-0">
          <h2>Finalización del curso</h2>
          <p className="small">
            Esto representa la cantidad de contenido del curso que ha completado. Tenga en cuenta que es posible que algunos contenidos aún no se hayan publicado.
          </p>
          <p className="mb-0">
            Tú has terminado el {completionPercentage}% del contenido de este curso.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-5 p-0 text-center">
            <svg viewBox="0 0 40 40" className="donut-svg donut" aria-hidden="true">
              <circle className="donut-hole" fill="#fff" cx="21" cy="21" r="15.91549430918954"></circle>
              <g className="donut-chart-text">
                <text x="35%" y="55%" className="donut-chart-number" style={{ fontSize: '5px' }}>
                  <tspan x="35%" dy="-1em">{completionPercentage}%</tspan>
                </text>
                <text x="35%" y="55%" className="donut-chart-label" style={{ fontSize: '5px' }}>
                  <tspan x="35%" dy="1em">logrado</tspan>
                </text>
              </g>
              <g className="donut-segment-group" tabIndex="-1">
                <circle className="donut-segment incomplete-stroke" cx="21" cy="21" r="15.91549430918954" strokeDasharray={incompleteDashArray} strokeDashoffset="-25"></circle>
                <rect x="19" y="3" style={{ transform: "rotate(0.675deg)" }}></rect>
              </g>
              <g className="donut-segment-group" tabIndex="-1">
                <rect x="19" y="3" style={{ transform: `rotate(${360 - (completionPercentage * 3.6)}deg)` }}></rect>
                <circle className="donut-segment complete-stroke" cx="21" cy="21" r="15.91549430918954" strokeDasharray={completeDashArray} strokeDashoffset="-25"></circle>
              </g>
            </svg>
          </div>
        </div>
      </section>
    );
  };  

export default CompletionSection;