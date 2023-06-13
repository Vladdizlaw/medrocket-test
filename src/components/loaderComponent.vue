<template >
  <div class="loader-container">
    <svg class="loader" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M26.5347 47.8658C32.1502 47.2694 37.3756 44.7119 41.2917 40.6432C45.2078 36.5746 47.5637 31.2553 47.9452 25.6211C48.3266 19.9869 46.7091 14.3986 43.3771 9.83927C40.0452 5.27991 35.2122 2.04149 29.7283 0.693639C24.2444 -0.654209 18.4609 -0.0251497 13.395 2.47017C8.32911 4.96548 4.30537 9.16723 2.03154 14.3363C-0.242285 19.5054 -0.620555 25.3108 0.96327 30.7312C2.54709 36.1516 5.99156 40.84 10.6908 43.9716L13.7163 39.4315C10.0854 37.0118 7.42391 33.3893 6.20013 29.201C4.97636 25.0128 5.26863 20.5271 7.02556 16.5331C8.78248 12.5391 11.8915 9.29254 15.8058 7.36447C19.7201 5.43641 24.1889 4.95035 28.4261 5.9918C32.6634 7.03324 36.3977 9.53549 38.9722 13.0584C41.5467 16.5813 42.7965 20.8992 42.5018 25.2526C42.2071 29.606 40.3867 33.716 37.3608 36.8598C34.335 40.0035 30.2975 41.9796 25.9585 42.4404L26.5347 47.8658Z"
        fill="url(#paint0_linear_103_6404)" />
      <defs>
        <linearGradient id="paint0_linear_103_6404" x1="27.5" y1="50.5" x2="14" y2="52.5" gradientUnits="userSpaceOnUse">
          <stop stop-color="#117DC1" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>

  </div>
</template>
<style scoped>
.loader-container {
  width: 100%;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;

}

.loader {
  animation: rotate 3s infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}</style>