<template>
  <div id="app" class="container">
    <div class="panel panel-default table-container">
      <div class="panel-heading">Users</div>
      <div class="panel-body">
        <div class="table-responsive">
          <table class="table table-striped table-bordered" id="dataTable">
            <thead>
              <tr>
                <th class="text-right">#</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in displayedUsers">
                <td class="text-right">{{ perPage * (page - 1) + index + 1 }}</td>
                <td>
                  <span class="picture">
                    <img
                      :src="user.picture.thumbnail"
                      :alt="user.name.first + ' ' + user.name.last"
                      class="img-circle"
                    />
                  </span>
                  <span>{{ user.name.first }} {{ user.name.last }}</span>
                </td>
                <td>
                  <a :href="'mailto:' + user.email">{{ user.email }}</a>
                </td>
                <td>{{ user.location.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="flex">
      <nav class="text-center" aria-label="Page navigation">
        <ul class="pagination pagination-sm">
          <li>
            <a href="#" @click="page = 1" aria-label="First">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li>
            <a href="#" v-if="page != 1" @click="page--" aria-label="Previous">
              <span aria-hidden="true">&lsaquo;</span>
            </a>
          </li>
          <li
            v-for="pageNumber in pages.slice(page - 1, page + 4)"
            :class="{ active: page === pageNumber }"
          >
            <a href="#" @click="page = pageNumber">{{ pageNumber }}</a>
          </li>
          <li>
            <a href="#" @click="page++" v-if="page < pages.length" aria-label="Next">
              <span aria-hidden="true">&rsaquo;</span>
            </a>
          </li>
          <li>
            <a href="#" @click="page = pages.length" aria-label="Last">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <!--
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js"></script>
  <script src="https://unpkg.com/axios@0.18.0/dist/axios.min.js"></script>
  -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  data() {
    return {
      users: [],
      loading: true,
      errored: false,
      url: "https://randomuser.me/api/?&results=100&inc=name,location,email,cell,picture",
      page: 1,
      perPage: 5,
      pages: [] as any[],
    };
  },
  methods: {
    getUsers() {
      axios
        .get(this.url)
        .then((response) => {
          this.users = response.data.results;
          console.log(this.users);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    setPages() {
      let numberOfPages = Math.ceil(this.users.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        console.log(index);
        this.pages.push(index);
      }
    },
    paginate(users: string | any[]) {
      var page = this.page;
      var perPage = this.perPage;
      var from = page * perPage - perPage;
      var to = page * perPage;
      return users.slice(from, to);
    },
  },
  created() {
    this.getUsers();
  },
  watch: {
    users() {
      this.setPages();
    },
  },
  computed: {
    displayedUsers() {
      return this.paginate(this.users);
    },
  },
  filters: {
    lowercase(value: string) {
      return value.toLowerCase();
    },
    capitalize(value: string) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
});
</script>

<style>
/*
body {
  background: #20262e;
  padding: 20px;
  font-family: Helvetica;
}

#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s;
}

li {
  margin: 8px 0;
}

h2 {
  font-weight: bold;
  margin-bottom: 15px;
}

th {
  font-weight: bold;
}
*/
/*
.table-container {
  margin: 10px;
}
.table-container .panel-heading {
  font-weight: bold;
}
.table-container .panel-body {
  padding: 0;
}
.table-container table {
  margin-bottom: 0;
  border: none;
}
.table-container table tr:last-child td {
  border-bottom: none;
}
.table-container table tr th {
  font-weight: bold;
}
.table-container table tr th:first-child,
.table-container table tr td:first-child {
  border-left: none;
}
.table-container table tr th:last-child,
.table-container table tr td:last-child {
  border-right: none;
}
.table-container table tr td {
  padding: 2px 8px !important;
  vertical-align: middle;
}
.table-container table tr td .picture {
  padding-right: 10px;
}
.table-container table tr td img {
  max-height: 30px;
  width: auto;
  border: 1px solid #c7c7c7;
}
*/
</style>
