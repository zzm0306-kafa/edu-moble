<template>
  <div class="course-video">
    <van-nav-bar
      title="视频"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 设置视频容器 -->
    <div id="video-container"></div>
  </div>
</template>
<script>
import { videoPlayInfo } from '@/services/course'
export default {
  name: 'CourseVideo',
  props: {
    lessonId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      courseVideo: {}
    }
  },
  created () {
    this.loadVideo()
  },
  methods: {
    async loadVideo () {
      const { data } = await videoPlayInfo({
        lessonId: this.lessonId
      })
      console.log(data)
      const player = new window.Aliplayer({
        // 视频容器id
        id: 'video-container',
        // 视频ID
        vid: data.content.fileId,
        // 视频凭证
        playauth: data.content.playAuth,
        qualitySort: 'asc',
        format: 'mp4',
        mediaType: 'video',
        width: '100%',
        height: '100%',
        autoplay: false,
        isLive: false,
        rePlay: false,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true
      }, function (player) {
        console.log('The player is created')
      })
      console.log(player)
    }
  }
}
</script>
<style lang="scss">
.course-video {
  width: 100%;
  height: 210px;
}
#video-container {
  width: 100%;
  height: auto;
}
</style>
