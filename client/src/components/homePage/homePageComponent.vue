<template>
    <div>
        <main-nav-bar-component :name="name"></main-nav-bar-component>
        <side-bar-component></side-bar-component>
    </div>
</template>

<script>
    import mainNavBarComponent from "./mainNavBarComponent";
    import {instance} from "../../config/axiosConfig";
    import sideBarComponent from "./sideBarComponent";

    export default {
        name: "homePageComponent",
        props: {
            token: String
        },
        data() {
            return {
                name: null
            }
        },
        components: {
            mainNavBarComponent,
            sideBarComponent
        },
        methods: {
            cekToken: function () {
                instance({
                    method: 'get',
                    url: '/authors',
                    headers: {
                        Authorization: "token " + localStorage.token
                    }
                }).then(({data}) => {
                    if (data) {
                        console.log(data);
                        this.name = data.details.name;
                        this.$toast.success({
                            title:'Success Sign In',
                            message:'Welcome back ' + data.details.name + " :)"
                        });
                    } else {
                        localStorage.clear();
                        location.reload();
                    }
                }).catch(err => {
                    console.log(err.response)
                })
            }
        },
        mounted() {
            this.cekToken();
        }
    }
</script>

<style scoped>

</style>