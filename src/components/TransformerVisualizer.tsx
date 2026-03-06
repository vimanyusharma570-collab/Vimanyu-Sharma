import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const TransformerVisualizer: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    const layers = 6;
    const nodesPerLayer = 8;
    const layerSpacing = width / (layers + 1);
    const nodeSpacing = height / (nodesPerLayer + 1);

    const nodes: any[] = [];
    for (let l = 0; l < layers; l++) {
      for (let n = 0; n < nodesPerLayer; n++) {
        nodes.push({
          id: `l${l}n${n}`,
          x: (l + 1) * layerSpacing,
          y: (n + 1) * nodeSpacing,
          layer: l
        });
      }
    }

    const links: any[] = [];
    for (let l = 0; l < layers - 1; l++) {
      for (let n1 = 0; n1 < nodesPerLayer; n1++) {
        for (let n2 = 0; n2 < nodesPerLayer; n2++) {
          if (Math.random() > 0.7) { // Sparse connections for visualization
            links.push({
              source: nodes.find(n => n.id === `l${l}n${n1}`),
              target: nodes.find(n => n.id === `l${l+1}n${n2}`)
            });
          }
        }
      }
    }

    const g = svg.append("g");

    // Draw links
    g.selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("stroke", "rgba(16, 185, 129, 0.1)")
      .attr("stroke-width", 1);

    // Draw nodes
    g.selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 4)
      .attr("fill", d => d.layer === 0 ? "#3b82f6" : d.layer === layers - 1 ? "#ef4444" : "#10b981")
      .attr("filter", "drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))");

    // Animation
    const animate = () => {
      g.selectAll("line")
        .transition()
        .duration(2000)
        .attr("stroke", () => `rgba(16, 185, 129, ${Math.random() * 0.3})`)
        .on("end", animate);
    };
    animate();

  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h3 className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-4">Attention Mechanism Architecture</h3>
      <svg ref={svgRef} viewBox="0 0 600 400" className="w-full h-auto max-w-2xl" />
      <div className="mt-4 flex gap-4 text-[10px] font-mono opacity-50">
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> Input Embedding</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Hidden Layers</div>
        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Output Head</div>
      </div>
    </div>
  );
};
