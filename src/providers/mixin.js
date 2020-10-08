

const minfun = {
    mounted() {
      console.log('this mixin2!')
    },
    methods:{
        currentSideBar(ev){
            var target = ev.target;
                if(target.tagName!=='LI'){
                    target = ev.target.parentElement;
                } 
               var  tag = target.getAttribute('tag');
               var obj = {
                   1:'/shoot/slot',
                   2:'/shoot/person',
                   3:'/shoot/person',
                   4:'/shoot/person',
               }
                var url = obj[tag];
                this.$router.push({
                    path:url,
                    query:{
                        tag
                    }
                });
        }
    }
  };

  export default minfun;