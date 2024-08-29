// store.js
import { createStore } from 'vuex'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8082'
})

const store = createStore({
  state: {
    // Book 관련 상태
    book: {},
    bookId: {},
    bookSequence: {},
    bookTitle: {},
    bookAuthor: {},
    bookWarning: {},
    bookDamage: {},
    bookLabel: {},
    bookList: [],

    // Member 관련 상태
    member: {},
    memberId: {},
    memberName: {},
    memberBirth: {},
    memberPhoneNumber: {},
    memberWarning: {},
    memberDamageCount: {},
    memberList: [],

    loan: {},
    loanId: {},
    loanTime: {},
    returnTime: {},
    declaration: {},
    damageDegree: {},
    memberId: {},
    bookId: {},
    loanRecords: [],
    memberDamageRecords: []
  },

  getters: {
    getBook(state) {
      return state.book
    },
    getBookList(state) {
      return state.bookList
    },
    getMember(state) {
      return state.member
    },
    getMemberList(state) {
      return state.memberList
    },
    getLoanRecords(state) {
      return state.loanRecords
    },
    getMemberById: (state) => (id) => {
      const member = state.memberList.find((member) => member.memberId === id)
      return member ? member.memberName : 'Unknown'
    },
    getBookById: (state) => (id) => {
      const book = state.bookList.find((book) => book.bookId === id)
      return book ? book.bookTitle : 'Unknown'
    },
    getDamagedBooks(state) {
      return state.bookList.filter((book) => book.bookWarning === '위험')
    },
    getBadMemberList(state) {
      return state.memberList.filter((member) => member.memberWarning === '위험');
    },
    getMemberWarningRatio(state) {
      const total = state.memberList.length;
      if (total === 0) return { safe: 0, warning: 0, danger: 0 };
  
      const counts = {
        safe: state.memberList.filter(member => member.memberWarning === '정상').length,
        warning: state.memberList.filter(member => member.memberWarning === '경고').length,
        danger: state.memberList.filter(member => member.memberWarning === '위험').length,
      };
  
      return {
        safe: (counts.safe / total * 100).toFixed(2),
        warning: (counts.warning / total * 100).toFixed(2),
        danger: (counts.danger / total * 100).toFixed(2),
      };
    },
    getBookWarningRatio(state) {
      const total = state.bookList.length;
      if (total === 0) return { safe: 0, warning: 0, danger: 0 };
  
      const counts = {
        safe: state.bookList.filter(book => book.bookWarning === '정상').length,
        warning: state.bookList.filter(book => book.bookWarning === '경고').length,
        danger: state.bookList.filter(book => book.bookWarning === '위험').length,
      };
  
      return {
        safe: (counts.safe / total * 100).toFixed(2),
        warning: (counts.warning / total * 100).toFixed(2),
        danger: (counts.danger / total * 100).toFixed(2),
      };
    },
  },

  mutations: {
    setBook(state, book) {
      state.book = book
    },
    setBookList(state, bookList) {
      state.bookList = bookList
    },
    setMember(state, member) {
      state.member = member
    },
    setLoanRecords(state, loanRecords) {
      state.loanRecords = loanRecords
    },
    setMemberList(state, memberList) {
      state.memberList = memberList
    },
    setMemberDamageRecords(state, records) {
      state.memberDamageRecords = records
    }
  },

  actions: {
    fetchBooks({ commit }) {
      axiosInstance
        .get('/book/get/all')
        .then((response) => {
          commit('setBookList', response.data)
        })
        .catch((error) => {
          alert(error.response?.data?.message || '책 목록을 가져오는 데 실패했습니다.')
        })
    },

    async fetchBookById({ state, commit }, id) {
      try {
        const book = state.bookList.find((book) => book.bookId === id)
        if (book) {
          return book
        } else {
          const response = await axiosInstance.get(`/book/get/${id}`)
          commit('setBook', response.data)
          return response.data
        }
      } catch (error) {
        console.error('책 정보 가져오기 실패:', error)
        return null
      }
    },

    fetchMembers({ commit }) {
      axiosInstance
        .get('/member/get/all')
        .then((response) => {
          commit('setMemberList', response.data)
        })
        .catch((error) => {
          alert(error.response?.data?.message || '회원 목록을 가져오는 데 실패했습니다.')
        })
    },

    async fetchMemberById({ state, commit }, id) {
      try {
        const member = state.memberList.find((member) => member.memberId === id)
        if (member) {
          return member
        } else {
          const response = await axiosInstance.get(`/member/get/${id}`)
          commit('setMember', response.data)
          return response.data
        }
      } catch (error) {
        console.error('회원 정보 가져오기 실패:', error)
        return null
      }
    },

    async fetchLoanRecords({ commit }, BookId) {
      // axiosInstance
      //   .get(`/loan/get/bookId/${id}`)
      //   .then((response) => {
      //     commit('setLoanRecords', response.data);
      //   })
      //   .catch((error) => {
      //     alert(error.response?.data?.message || '대출 기록을 가져오는 데 실패했습니다.');
      //   });
      try {
        const response = await axiosInstance.get(`/loan/get/bookId/${BookId}`)
        commit('setLoanRecords', response.data)
      } catch (error) {
        alert(error.response?.data?.message || '대출 기록을 가져오는 데 실패했습니다.')
      }
    },

    async fetchLoanRecordsByMemberId({ commit }, memberId) {
      try {
        const response = await axiosInstance.get(`/loan/get/memberId/${memberId}`)
        commit('setLoanRecords', response.data)
      } catch (error) {
        console.error('Failed to fetch loan records:', error)
      }
    },

    async fetchMembers({ commit }) {
      try {
        const response = await axiosInstance.get('/member/get/all')
        commit('setMemberList', response.data)
      } catch (error) {
        alert(error.response?.data?.message || '회원 목록을 가져오는 데 실패했습니다.')
      }
    }
  }
})

export default store
