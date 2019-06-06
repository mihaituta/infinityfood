<template>
    <div>{{store.name}}</div>
</template>

<script>
    export default {
        data: () => {
            return {};
        },
        computed: {
            store() {
                return this.$store.getters.store;
            }
        },
        created() {
            this.$store.dispatch('getStore', this.$route.params.slug).then((res) => {
                if(res.responseType === 'error'){
                     this.$router.replace({name: 'error',params: { '0': '404'}});
                    // this.$router.push({name: 'error'});
                }
            });
        }
    };
</script>

<style scoped>

</style>