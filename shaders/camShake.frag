#pragma header
vec2 uv = openfl_TextureCoordv.xy;
vec2 fragCoord = openfl_TextureCoordv*openfl_TextureSize;
vec2 iResolution = openfl_TextureSize;
uniform float iTime;
#define iChannel0 bitmap
#define texture flixel_texture2D
#define fragColor gl_FragColor
#define mainImage main

float random2d(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float randomRange (in vec2 seed, in float min, in float max) {
		return min + random2d(seed) * (max - min);
}

float insideRange(float v, float bottom, float top) {
   return step(bottom, v) - step(top, v);
}

float AMT = 0.05;
float SPEED = 0.6;

void mainImage()
{
    float time = floor(iTime * SPEED * 60.0);    
	vec2 uv = fragCoord.xy / iResolution.xy;
    
    vec3 outCol = texture(iChannel0, uv).rgb;
    
    float maxOffset = AMT/2.0;
    for (float i = 0.0; i < 10.0 * AMT; i += 1.0) {
        float sliceY = random2d(vec2(time , 2345.0 + float(i)));
        float sliceH = random2d(vec2(time , 9035.0 + float(i))) * 0.25;
        float hOffset = randomRange(vec2(time , 9625.0 + float(i)), -maxOffset, maxOffset);
        vec2 uvOff = uv;
        uvOff.x += hOffset;
        if (insideRange(uv.y, sliceY, fract(sliceY+sliceH)) == 1.0 ){
        	outCol = texture(iChannel0, uvOff).rgb;
        }
    }
    
    float maxColOffset = AMT/6.0;
    float rnd = random2d(vec2(time , 9545.0));
    vec2 colOffset = vec2(randomRange(vec2(time , 9545.0),-maxColOffset,maxColOffset), 
                       randomRange(vec2(time , 7205.0),-maxColOffset,maxColOffset));
    if (rnd < 0.33){
        outCol.r = texture(iChannel0, uv + colOffset).r;
        
    }else if (rnd < 0.66){
        outCol.g = texture(iChannel0, uv + colOffset).g;
        
    } else{
        outCol.b = texture(iChannel0, uv + colOffset).b;  
    }
       
	fragColor = vec4(outCol,1.0);
}