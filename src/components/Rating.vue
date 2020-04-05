<template>
  <div 
    class="rating"
    :class="sizeStar? sizeStar: ''"
  >
    <span v-if="solidStar > 0">
	    <img
  	    v-for="solid in solidStar"
    	  :key="solid"
      	src="../assets/star-full.png"
    	/>
    </span>
    <span v-if="halfStar > 0">
      <img                
        src="../assets/star-half-empty.png"
      />
    </span>
    <span v-if="regularStar > 0">
      <img
        v-for="regular in regularStar"
        :key="regular"
        src="../assets/star-empty.png"
      />
    </span>
  </div>
</template>

<script>
const maxRating = 5;
export default {
  props: {
    rating: {
      type: Number,
      required: true
    },
    sizeStar: String
  },
  computed: {
  	solidStar: function() {
      return Math.floor(this.rating);
    },
	  regularStar: function() {
  	  return Math.floor(maxRating - this.rating);
	  },
  	halfStar: function() {
	    return  Math.ceil(this.rating - Math.floor(this.rating));
  	}
 	}
}
</script>

<style lang="scss">
.rating img {
	width: 12px;
}
.rating.big img {
	width: 16px;
}
</style>