import { createStore } from 'vuex'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8082'
})

const store = createStore({
  state: {
    // Book 관련 상태
    book: {},
    bookList: [], // 전체 책 목록을 저장

    // Member 관련 상태
    member: {},
    memberList: [] // 전체 사용자 목록을 저장
  },

  getters: {
    // Book 관련 getters
    getBook(state) {
      return state.book
    },
    getBookList(state) {
      return state.bookList
    },

    // Member 관련 getters
    getMember(state) {
      return state.member
    },
    getMemberList(state) {
      return state.memberList
    }
  },

  mutations: {
    // Book
    setBook(state, book) {
      state.book = book
    },
    setBookList(state, bookList) {
      state.bookList = bookList
    },

    // Member
    setMember(state, member) {
      state.member = member
    },
    setMemberList(state, memberList) {
      state.memberList = memberList
    }
  },

  actions: {
    // Book
    fetchBooks({ commit }) {
      axiosInstance
        .get('/book/get/all')
        .then((response) => {
          commit('setBookList', response.data)
        })
        .catch((error) => {
          alert(error.response?.data?.message || '데이터를 가져오는 데 실패했습니다.')
        })
    },
    async fetchBookById({ state, commit }, id) {
      try {
        // 로컬 상태에서 책을 찾기
        const book = state.bookList.find(book => book.bookId === id);
        if (book) {
          return book;
        } else {
          // 로컬 상태에서 책을 찾지 못한 경우 API를 호출
          const response = await axiosInstance.get(`/book/get/${id}`);
          commit('setBook', response.data); // 새 책 정보를 스토어에 저장
          return response.data;
        }
      } catch (error) {
        console.error('책 정보 가져오기 실패:', error);
        return null;
      }
    },

    // Member
    fetchMembers({ commit }) {
      axiosInstance
        .get('/member/get/all')
        .then((response) => {
          commit('setMemberList', response.data)
        })
        .catch((error) => {
          alert(error.response?.data?.message || '사용자 데이터를 가져오는 데 실패했습니다.')
        })
    },
    async fetchMemberById({ state, commit }, id) {
      try {
        // 로컬 상태에서 멤버를 찾습니다.
        const member = state.memberList.find(member => member.memberId === id)
        if (member) {
          return member
        } else {
          // 로컬 상태에서 멤버를 찾지 못한 경우 API를 호출합니다.
          const response = await axiosInstance.get(`/member/get/${id}`)
          commit('setMember', response.data) // 새 멤버 정보를 스토어에 저장
          return response.data
        }
      } catch (error) {
        console.error('멤버 정보 가져오기 실패:', error)
        return null
      }
    }
  }
})

export default store
