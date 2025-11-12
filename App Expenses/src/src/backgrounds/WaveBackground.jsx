import { useEffect, useRef } from "react";

export const WaveBackground = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef({
    renderer: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const { current: refs } = sceneRef;

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;

    const initScene = () => {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.error('WebGL not supported');
        return;
      }

      refs.renderer = gl;
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      refs.uniforms = {
        resolution: [window.innerWidth, window.innerHeight],
        time: 0.0,
        xScale: 1.0,
        yScale: 0.5,
        distortion: 0.05,
      };

      // Create shader program
      const vertShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertShader, vertexShader);
      gl.compileShader(vertShader);

      const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragShader, fragmentShader);
      gl.compileShader(fragShader);

      const program = gl.createProgram();
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      // Create geometry
      const positions = new Float32Array([
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      const positionLoc = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

      // Get uniform locations
      refs.resolutionLoc = gl.getUniformLocation(program, 'resolution');
      refs.timeLoc = gl.getUniformLocation(program, 'time');
      refs.xScaleLoc = gl.getUniformLocation(program, 'xScale');
      refs.yScaleLoc = gl.getUniformLocation(program, 'yScale');
      refs.distortionLoc = gl.getUniformLocation(program, 'distortion');

      handleResize();
    };

    const animate = () => {
      const gl = refs.renderer;
      if (!gl || !refs.uniforms) return;

      refs.uniforms.time += 0.01;

      gl.uniform2f(refs.resolutionLoc, refs.uniforms.resolution[0], refs.uniforms.resolution[1]);
      gl.uniform1f(refs.timeLoc, refs.uniforms.time);
      gl.uniform1f(refs.xScaleLoc, refs.uniforms.xScale);
      gl.uniform1f(refs.yScaleLoc, refs.uniforms.yScale);
      gl.uniform1f(refs.distortionLoc, refs.uniforms.distortion);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      refs.animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      refs.renderer.viewport(0, 0, width, height);
      refs.uniforms.resolution = [width, height];
    };

    initScene();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};
