new Vue({
  el: "#app",
  data: {
    search: "",
    searchResult: [],
    visitor: "",
    person: "",
  },
  // created: {},
  methods: {
    searchInput: function () {
      fetch("/users?select=id,name,email&name[like]=" + this.search)
        .then((res) => res.json())
        .then((res) => {
          console.log(res.data);
          this.searchResult = res.data;
        })
        .catch(console.log);
    },
    setInput: function (value, target) {},
  },
});
