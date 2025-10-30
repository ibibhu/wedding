<template>
  <div 
    class="youtube-video-wrapper relative overflow-hidden rounded-lg shadow-lg bg-black cursor-pointer"
    @click="loadVideo"
  >
    <!-- Lazy loading implementation -->
    <div 
      v-if="!videoLoaded" 
      class="relative w-full h-full bg-gray-900 flex items-center justify-center"
    >
      <!-- YouTube thumbnail -->
      <img 
        :src="thumbnailUrl" 
        :alt="title"
        class="w-full h-full object-cover"
      />
      <!-- Play button overlay -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center hover:bg-red-700 transition-colors">
          <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Actual YouTube iframe (loaded on demand) -->
    <iframe 
      v-if="videoLoaded"
      :src="embedUrl" 
      :width="width"
      :height="height"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="w-full h-full"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  title?: string
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'YouTube Video',
  width: '100%',
  height: '315'
})

const videoLoaded = ref(false)

// Extract video ID from YouTube URL
const videoId = computed(() => {
  const url = props.src
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
  return match ? match[1] : ''
})

// Generate thumbnail URL
const thumbnailUrl = computed(() => {
  return videoId.value ? `https://img.youtube.com/vi/${videoId.value}/maxresdefault.jpg` : ''
})

// Generate embed URL with autoplay
const embedUrl = computed(() => {
  return videoId.value ? `https://www.youtube.com/embed/${videoId.value}?autoplay=1` : props.src
})

const loadVideo = () => {
  videoLoaded.value = true
}
</script>

<style scoped>
.youtube-video-wrapper {
  aspect-ratio: 16 / 9;
}
</style>