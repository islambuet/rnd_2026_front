<template>
  <header id="system_top_bar" class="d-print-none">
    <!-- LOGO -->
    <div id="logo_container" class="d-none d-lg-block d-xl-block float-left">
        <img style="height: 25px;" v-bind:src="globalVariables.baseUrl+'theme/images/logo-lg.png'" alt="">        
    </div>
    <!-- Left Sidebar handler -->
    <button id="handler_left_sidebar" class="handler-sidebar float-left">
        <i class="bi bi-justify fs-3"></i>
    </button>
    <ul class="list-unstyled float-right mb-0">
        <li class="d-none">
            <a class="nav-link dropdown-toggle mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <span class="ml-1">
                                    {{labels.get('label_change_language')}}
                                </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <!-- item-->
                <a v-for="(language,i) in globalVariables.language_available" :key="'language_'+i" href="#" class="dropdown-item" v-on:click="systemFunctions.changeLanguage(language)">
                    <span>{{labels.get('label_'+language)}}</span>
                </a>                
            </div>
        </li>
        <!-- Users options -->
        <li>
            <a class="nav-link dropdown-toggle mr-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                <img v-bind:src="(globalVariables.user.profile_picture?globalVariables.baseURLUploadedFilesLink+'/'+globalVariables.user.profile_picture:globalVariables.baseUrl+'theme/images/guest.png')" alt="profileImage" class="rounded-circle" style="height: 32px;width: 32px;">
            </a>
            <div class="dropdown-menu dropdown-menu-right">
                <div class="dropdown-item">
                    <h6 class="text-overflow m-0">{{labels.get('label_welcome')}} {{globalVariables.user.name}}</h6>
                </div>
                <router-link to="/user/profile" :class="'dropdown-item'"><i class="bi bi-person-square"></i> {{labels.get('label_profile_settings')}}</router-link>
                <div class="dropdown-divider"></div>
                <a href="#" class="system_ajax dropdown-item" v-on:click.prevent="logout"><i class="icon-mid bi bi-power me-2"></i> {{labels.get('label_logout')}}</a>
            </div>            
        </li>
    </ul>
</header>
</template>
<script setup>
    import globalVariables from "@/assets/globalVariables";
    import systemFunctions from "@/assets/systemFunctions";
    import labels from '@/labels' 
    import {useRouter} from 'vue-router';
    import axios from 'axios';
    const router =useRouter()

    const logout=()=>{            
        axios.get('/user/logout')
        .then(response => {
          //TODO if response has no error
          globalVariables.logout();
          router.push("/login");
        })
    }
</script>