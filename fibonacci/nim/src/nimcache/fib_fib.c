/* Generated by Nim Compiler v0.18.0 */
/*   (c) 2018 Andreas Rumpf */
/* The generated code is subject to the original license. */
/* Compiled for: MacOSX, amd64, clang */
/* Command for C compiler:
   clang -c  -w  -I/Users/alextanhongpin/.choosenim/toolchains/nim-0.18.0/lib -o /Users/alextanhongpin/Documents/architecture/data-structures-and-algorithms/fibonacci/nim/src/nimcache/fib_fib.o /Users/alextanhongpin/Documents/architecture/data-structures-and-algorithms/fibonacci/nim/src/nimcache/fib_fib.c */
#define NIM_NEW_MANGLING_RULES
#define NIM_INTBITS 64

#include "nimbase.h"
#include <string.h>
#undef LANGUAGE_C
#undef MIPSEB
#undef MIPSEL
#undef PPC
#undef R3000
#undef R4000
#undef i386
#undef linux
#undef mips
#undef near
#undef powerpc
#undef unix
typedef struct tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ;
typedef struct tySequence_Wg7nX0qLJ8wQZhTWq4sHLg tySequence_Wg7nX0qLJ8wQZhTWq4sHLg;
typedef struct tyTuple_YOR5jKx8MEDwDUQgT5GkXQ tyTuple_YOR5jKx8MEDwDUQgT5GkXQ;
typedef struct NimStringDesc NimStringDesc;
typedef struct TGenericSeq TGenericSeq;
typedef struct tyTuple_rrmSsGcwh4hPYQjvS08J6g tyTuple_rrmSsGcwh4hPYQjvS08J6g;
struct tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ {
tySequence_Wg7nX0qLJ8wQZhTWq4sHLg* data;
NI counter;
};
struct tyTuple_YOR5jKx8MEDwDUQgT5GkXQ {
NI Field0;
NU64 Field1;
};
typedef tyTuple_YOR5jKx8MEDwDUQgT5GkXQ tyArray_9aCcI2sY9cjF7u9ajQRsIt5Lg[2];
struct TGenericSeq {
NI len;
NI reserved;
};
struct NimStringDesc {
  TGenericSeq Sup;
NIM_CHAR data[SEQ_DECL_SIZE];
};
typedef NimStringDesc* tyArray_nHXaesL0DJZHyVS07ARPRA[1];
struct tyTuple_rrmSsGcwh4hPYQjvS08J6g {
NI Field0;
NI Field1;
NU64 Field2;
};
struct tySequence_Wg7nX0qLJ8wQZhTWq4sHLg {
  TGenericSeq Sup;
  tyTuple_rrmSsGcwh4hPYQjvS08J6g data[SEQ_DECL_SIZE];
};
N_LIB_PRIVATE N_NIMCALL(NI64, fibo_Mcf34EdyTl9chwdy9bexLQWw)(NI n);
static N_INLINE(NI, subInt)(NI a, NI b);
N_NOINLINE(void, raiseOverflow)(void);
static N_INLINE(NI64, addInt64)(NI64 a, NI64 b);
static N_INLINE(void, nimFrame)(TFrame* s);
N_LIB_PRIVATE N_NOINLINE(void, stackOverflow_II46IjNZztN9bmbxUD8dt8g)(void);
static N_INLINE(void, popFrame)(void);
N_LIB_PRIVATE N_NIMCALL(NU64, fib_dynamic_hiTH3e40sA9axVXN9czUSIew)(NI n);
N_LIB_PRIVATE N_NIMCALL(void, toTable_EXguNIel8wutxv7IMYPfQw)(tyTuple_YOR5jKx8MEDwDUQgT5GkXQ* pairs, NI pairsLen_0, tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ* Result);
N_LIB_PRIVATE N_NIMCALL(void, X5BX5Deq__RDMF8dZ9cRGeQi30NTpe9aMQ)(tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ* t, NI key, NU64 val);
N_LIB_PRIVATE N_NIMCALL(NU64*, X5BX5D__TMgsAP8Y4HYj9bqNngG3xiQ)(tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ* t, NI key);
static N_INLINE(NI, addInt)(NI a, NI b);
N_LIB_PRIVATE N_NIMCALL(void, main_rgIXYCi0KHcWjySNuM4lTg)(void);
N_NIMCALL(NimStringDesc*, nimInt64ToStr)(NI64 x);
N_NIMCALL(void, echoBinSafe)(NimStringDesc** args, NI argsLen_0);
N_LIB_PRIVATE N_NIMCALL(NimStringDesc*, dollar__rzAI8EMyNBAQwGODeohhAA)(NU64 x);
N_LIB_PRIVATE N_NIMCALL(void, initTable_W0gqRgc1XWFZBKWTFI9cPNQ)(NI initialSize, tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ* Result);
static N_INLINE(NI, rawGet_pHxlA7mCdQ6JLyovZu439agtables)(tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ t, NI key, NI* hc);
static N_INLINE(NI, hash_M6zZEYz39abIOUmj0QsNREghashes)(NI x);
static N_INLINE(NIM_BOOL, isFilled_IxXD1UAPoEehVDW9cv9cRaew_2tables)(NI hcode);
N_NOINLINE(void, raiseIndexError)(void);
static N_INLINE(NI, nextTry_OLPhxSyW9bte5CwHzzQVhfAtables)(NI h, NI maxHash);
N_LIB_PRIVATE N_NIMCALL(void, enlarge_mdEBB5jtsqsxzoevkOColA)(tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ* t);
N_LIB_PRIVATE N_NIMCALL(void, rawInsert_69bTbaK7w9bJzxAF0bHaoU5Q)(tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ* t, tySequence_Wg7nX0qLJ8wQZhTWq4sHLg** data, NI key, NU64 val, NI hc, NI h);
static N_INLINE(NI, rawGetKnownHC_4NnYqJGGQ1dChBj4ZRjLUAtables)(tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ t, NI key, NI hc);
static N_INLINE(void, initStackBottomWith)(void* locals);
N_NOINLINE(void, setStackBottom)(void* theStackBottom);
NIM_EXTERNC N_NOINLINE(void, systemInit000)(void);
NIM_EXTERNC N_NOINLINE(void, systemDatInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_parseutilsInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_parseutilsDatInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_mathInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_mathDatInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_algorithmInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_algorithmDatInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_strutilsInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_strutilsDatInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_hashesInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_hashesDatInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_tablesInit000)(void);
NIM_EXTERNC N_NOINLINE(void, stdlib_tablesDatInit000)(void);
NIM_EXTERNC N_NOINLINE(void, NimMainModule)(void);
NIM_EXTERNC N_NOINLINE(void, fibDatInit000)(void);
extern TFrame* framePtr_HRfVMH3jYeBJz6Q6X9b6Ptw;
NIM_CONST tyArray_9aCcI2sY9cjF7u9ajQRsIt5Lg TM_wjFa7LsXk0SmFUwnlig9cTA_5 = {{((NI) 0),
0ULL}
,
{((NI) 1),
1ULL}
}
;

static N_INLINE(NI, subInt)(NI a, NI b) {
	NI result;
{	result = (NI)0;
	result = (NI)((NU64)(a) - (NU64)(b));
	{
		NIM_BOOL T3_;
		T3_ = (NIM_BOOL)0;
		T3_ = (((NI) 0) <= (NI)(result ^ a));
		if (T3_) goto LA4_;
		T3_ = (((NI) 0) <= (NI)(result ^ (NI)((NU64) ~(b))));
		LA4_: ;
		if (!T3_) goto LA5_;
		goto BeforeRet_;
	}
	LA5_: ;
	raiseOverflow();
	}BeforeRet_: ;
	return result;
}

static N_INLINE(NI64, addInt64)(NI64 a, NI64 b) {
	NI64 result;
{	result = (NI64)0;
	result = (NI64)((NU64)(a) + (NU64)(b));
	{
		NIM_BOOL T3_;
		T3_ = (NIM_BOOL)0;
		T3_ = (IL64(0) <= (NI64)(result ^ a));
		if (T3_) goto LA4_;
		T3_ = (IL64(0) <= (NI64)(result ^ b));
		LA4_: ;
		if (!T3_) goto LA5_;
		goto BeforeRet_;
	}
	LA5_: ;
	raiseOverflow();
	}BeforeRet_: ;
	return result;
}

static N_INLINE(void, nimFrame)(TFrame* s) {
	NI T1_;
	T1_ = (NI)0;
	{
		if (!(framePtr_HRfVMH3jYeBJz6Q6X9b6Ptw == NIM_NIL)) goto LA4_;
		T1_ = ((NI) 0);
	}
	goto LA2_;
	LA4_: ;
	{
		T1_ = ((NI) ((NI16)((*framePtr_HRfVMH3jYeBJz6Q6X9b6Ptw).calldepth + ((NI16) 1))));
	}
	LA2_: ;
	(*s).calldepth = ((NI16) (T1_));
	(*s).prev = framePtr_HRfVMH3jYeBJz6Q6X9b6Ptw;
	framePtr_HRfVMH3jYeBJz6Q6X9b6Ptw = s;
	{
		if (!((*s).calldepth == ((NI16) 2000))) goto LA9_;
		stackOverflow_II46IjNZztN9bmbxUD8dt8g();
	}
	LA9_: ;
}

static N_INLINE(void, popFrame)(void) {
	framePtr_HRfVMH3jYeBJz6Q6X9b6Ptw = (*framePtr_HRfVMH3jYeBJz6Q6X9b6Ptw).prev;
}

N_LIB_PRIVATE N_NIMCALL(NI64, fibo_Mcf34EdyTl9chwdy9bexLQWw)(NI n) {
	NI64 result;
	nimfr_("fibo", "fib.nim");
	result = (NI64)0;
	nimln_(4, "fib.nim");
	switch (n) {
	case ((NI) 0):
	{
		result = IL64(0);
	}
	break;
	case ((NI) 1):
	case ((NI) 2):
	{
		result = IL64(1);
	}
	break;
	default:
	{
		NI TM_wjFa7LsXk0SmFUwnlig9cTA_2;
		NI64 T4_;
		NI TM_wjFa7LsXk0SmFUwnlig9cTA_3;
		NI64 T5_;
		NI64 TM_wjFa7LsXk0SmFUwnlig9cTA_4;
		nimln_(7, "fib.nim");
		TM_wjFa7LsXk0SmFUwnlig9cTA_2 = subInt(n, ((NI) 2));
		T4_ = (NI64)0;
		T4_ = fibo_Mcf34EdyTl9chwdy9bexLQWw((NI)(TM_wjFa7LsXk0SmFUwnlig9cTA_2));
		TM_wjFa7LsXk0SmFUwnlig9cTA_3 = subInt(n, ((NI) 1));
		T5_ = (NI64)0;
		T5_ = fibo_Mcf34EdyTl9chwdy9bexLQWw((NI)(TM_wjFa7LsXk0SmFUwnlig9cTA_3));
		TM_wjFa7LsXk0SmFUwnlig9cTA_4 = addInt64(T4_, T5_);
		result = (NI64)(TM_wjFa7LsXk0SmFUwnlig9cTA_4);
	}
	break;
	}
	popFrame();
	return result;
}

static N_INLINE(NI, addInt)(NI a, NI b) {
	NI result;
{	result = (NI)0;
	result = (NI)((NU64)(a) + (NU64)(b));
	{
		NIM_BOOL T3_;
		T3_ = (NIM_BOOL)0;
		T3_ = (((NI) 0) <= (NI)(result ^ a));
		if (T3_) goto LA4_;
		T3_ = (((NI) 0) <= (NI)(result ^ b));
		LA4_: ;
		if (!T3_) goto LA5_;
		goto BeforeRet_;
	}
	LA5_: ;
	raiseOverflow();
	}BeforeRet_: ;
	return result;
}

N_LIB_PRIVATE N_NIMCALL(NU64, fib_dynamic_hiTH3e40sA9axVXN9czUSIew)(NI n) {
	NU64 result;
	tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ table;
	NU64* T6_;
	nimfr_("fib_dynamic", "fib.nim");
	result = (NU64)0;
	memset((void*)(&table), 0, sizeof(table));
	nimln_(10, "fib.nim");
	toTable_EXguNIel8wutxv7IMYPfQw(TM_wjFa7LsXk0SmFUwnlig9cTA_5, 2, (&table));
	{
		NI i;
		NI res;
		i = (NI)0;
		nimln_(2045, "system.nim");
		res = ((NI) 2);
		{
			nimln_(2046, "system.nim");
			while (1) {
				NI TM_wjFa7LsXk0SmFUwnlig9cTA_6;
				NU64* T4_;
				NI TM_wjFa7LsXk0SmFUwnlig9cTA_7;
				NU64* T5_;
				NI TM_wjFa7LsXk0SmFUwnlig9cTA_8;
				if (!(res <= n)) goto LA3;
				nimln_(2047, "system.nim");
				i = res;
				nimln_(23, "fib.nim");
				TM_wjFa7LsXk0SmFUwnlig9cTA_6 = subInt(i, ((NI) 2));
				T4_ = (NU64*)0;
				T4_ = X5BX5D__TMgsAP8Y4HYj9bqNngG3xiQ((&table), (NI)(TM_wjFa7LsXk0SmFUwnlig9cTA_6));
				TM_wjFa7LsXk0SmFUwnlig9cTA_7 = subInt(i, ((NI) 1));
				T5_ = (NU64*)0;
				T5_ = X5BX5D__TMgsAP8Y4HYj9bqNngG3xiQ((&table), (NI)(TM_wjFa7LsXk0SmFUwnlig9cTA_7));
				X5BX5Deq__RDMF8dZ9cRGeQi30NTpe9aMQ((&table), i, (NU64)((NU64)((*T4_)) + (NU64)((*T5_))));
				nimln_(2048, "system.nim");
				TM_wjFa7LsXk0SmFUwnlig9cTA_8 = addInt(res, ((NI) 1));
				res = (NI)(TM_wjFa7LsXk0SmFUwnlig9cTA_8);
			} LA3: ;
		}
	}
	nimln_(25, "fib.nim");
	T6_ = (NU64*)0;
	T6_ = X5BX5D__TMgsAP8Y4HYj9bqNngG3xiQ((&table), n);
	result = (*T6_);
	popFrame();
	return result;
}

N_LIB_PRIVATE N_NIMCALL(void, main_rgIXYCi0KHcWjySNuM4lTg)(void) {
	tyArray_nHXaesL0DJZHyVS07ARPRA T1_;
	NI64 T2_;
	tyArray_nHXaesL0DJZHyVS07ARPRA T3_;
	NU64 T4_;
	nimfr_("main", "fib.nim");
	nimln_(29, "fib.nim");
	memset((void*)T1_, 0, sizeof(T1_));
	T2_ = (NI64)0;
	T2_ = fibo_Mcf34EdyTl9chwdy9bexLQWw(((NI) 10));
	T1_[0] = nimInt64ToStr(T2_);
	echoBinSafe(T1_, 1);
	nimln_(30, "fib.nim");
	memset((void*)T3_, 0, sizeof(T3_));
	T4_ = (NU64)0;
	T4_ = fib_dynamic_hiTH3e40sA9axVXN9czUSIew(((NI) 100));
	T3_[0] = dollar__rzAI8EMyNBAQwGODeohhAA(T4_);
	echoBinSafe(T3_, 1);
	popFrame();
}

static N_INLINE(NI, hash_M6zZEYz39abIOUmj0QsNREghashes)(NI x) {
	NI result;
	nimfr_("hash", "hashes.nim");
	result = (NI)0;
	nimln_(109, "hashes.nim");
	result = x;
	popFrame();
	return result;
}

static N_INLINE(NIM_BOOL, isFilled_IxXD1UAPoEehVDW9cv9cRaew_2tables)(NI hcode) {
	NIM_BOOL result;
	nimfr_("isFilled", "tableimpl.nim");
	result = (NIM_BOOL)0;
	nimln_(18, "tableimpl.nim");
	nimln_(398, "system.nim");
	nimln_(18, "tableimpl.nim");
	result = !((hcode == ((NI) 0)));
	popFrame();
	return result;
}

static N_INLINE(NI, nextTry_OLPhxSyW9bte5CwHzzQVhfAtables)(NI h, NI maxHash) {
	NI result;
	NI TM_wjFa7LsXk0SmFUwnlig9cTA_9;
	nimfr_("nextTry", "tableimpl.nim");
	result = (NI)0;
	nimln_(28, "tableimpl.nim");
	TM_wjFa7LsXk0SmFUwnlig9cTA_9 = addInt(h, ((NI) 1));
	result = (NI)((NI)(TM_wjFa7LsXk0SmFUwnlig9cTA_9) & maxHash);
	popFrame();
	return result;
}

static N_INLINE(NI, rawGet_pHxlA7mCdQ6JLyovZu439agtables)(tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ t, NI key, NI* hc) {
	NI result;
	NI h;
	NI T5_;
	NI TM_wjFa7LsXk0SmFUwnlig9cTA_10;
	nimfr_("rawGet", "tableimpl.nim");
{	result = (NI)0;
	nimln_(53, "tableimpl.nim");
	(*hc) = hash_M6zZEYz39abIOUmj0QsNREghashes(key);
	{
		if (!((*hc) == ((NI) 0))) goto LA3_;
		nimln_(45, "tableimpl.nim");
		(*hc) = ((NI) 314159265);
	}
	LA3_: ;
	nimln_(31, "tableimpl.nim");
	nimln_(116, "tables.nim");
	T5_ = (t.data ? (t.data->Sup.len-1) : -1);
	h = (NI)((*hc) & T5_);
	{
		nimln_(32, "tableimpl.nim");
		while (1) {
			NIM_BOOL T8_;
			NI T15_;
			if ((NU)(h) >= (NU)(t.data->Sup.len)) raiseIndexError();
			T8_ = (NIM_BOOL)0;
			T8_ = isFilled_IxXD1UAPoEehVDW9cv9cRaew_2tables(t.data->data[h].Field0);
			if (!T8_) goto LA7;
			nimln_(37, "tableimpl.nim");
			{
				NIM_BOOL T11_;
				T11_ = (NIM_BOOL)0;
				if ((NU)(h) >= (NU)(t.data->Sup.len)) raiseIndexError();
				T11_ = (t.data->data[h].Field0 == (*hc));
				if (!(T11_)) goto LA12_;
				if ((NU)(h) >= (NU)(t.data->Sup.len)) raiseIndexError();
				T11_ = (t.data->data[h].Field1 == key);
				LA12_: ;
				if (!T11_) goto LA13_;
				nimln_(38, "tableimpl.nim");
				result = h;
				goto BeforeRet_;
			}
			LA13_: ;
			nimln_(39, "tableimpl.nim");
			nimln_(116, "tables.nim");
			T15_ = (t.data ? (t.data->Sup.len-1) : -1);
			h = nextTry_OLPhxSyW9bte5CwHzzQVhfAtables(h, T15_);
		} LA7: ;
	}
	nimln_(40, "tableimpl.nim");
	TM_wjFa7LsXk0SmFUwnlig9cTA_10 = subInt(((NI) -1), h);
	result = (NI)(TM_wjFa7LsXk0SmFUwnlig9cTA_10);
	}BeforeRet_: ;
	popFrame();
	return result;
}

static N_INLINE(NI, rawGetKnownHC_4NnYqJGGQ1dChBj4ZRjLUAtables)(tyObject_Table_NMeFPw46ttTYWlkoE1fSPQ t, NI key, NI hc) {
	NI result;
	NI h;
	NI T1_;
	NI TM_wjFa7LsXk0SmFUwnlig9cTA_11;
	nimfr_("rawGetKnownHC", "tableimpl.nim");
{	result = (NI)0;
	nimln_(31, "tableimpl.nim");
	nimln_(116, "tables.nim");
	T1_ = (t.data ? (t.data->Sup.len-1) : -1);
	h = (NI)(hc & T1_);
	{
		nimln_(32, "tableimpl.nim");
		while (1) {
			NIM_BOOL T4_;
			NI T11_;
			if ((NU)(h) >= (NU)(t.data->Sup.len)) raiseIndexError();
			T4_ = (NIM_BOOL)0;
			T4_ = isFilled_IxXD1UAPoEehVDW9cv9cRaew_2tables(t.data->data[h].Field0);
			if (!T4_) goto LA3;
			nimln_(37, "tableimpl.nim");
			{
				NIM_BOOL T7_;
				T7_ = (NIM_BOOL)0;
				if ((NU)(h) >= (NU)(t.data->Sup.len)) raiseIndexError();
				T7_ = (t.data->data[h].Field0 == hc);
				if (!(T7_)) goto LA8_;
				if ((NU)(h) >= (NU)(t.data->Sup.len)) raiseIndexError();
				T7_ = (t.data->data[h].Field1 == key);
				LA8_: ;
				if (!T7_) goto LA9_;
				nimln_(38, "tableimpl.nim");
				result = h;
				goto BeforeRet_;
			}
			LA9_: ;
			nimln_(39, "tableimpl.nim");
			nimln_(116, "tables.nim");
			T11_ = (t.data ? (t.data->Sup.len-1) : -1);
			h = nextTry_OLPhxSyW9bte5CwHzzQVhfAtables(h, T11_);
		} LA3: ;
	}
	nimln_(40, "tableimpl.nim");
	TM_wjFa7LsXk0SmFUwnlig9cTA_11 = subInt(((NI) -1), h);
	result = (NI)(TM_wjFa7LsXk0SmFUwnlig9cTA_11);
	}BeforeRet_: ;
	popFrame();
	return result;
}

static N_INLINE(void, initStackBottomWith)(void* locals) {
	setStackBottom(locals);
}
void PreMainInner(void) {
	systemInit000();
	stdlib_parseutilsDatInit000();
	stdlib_mathDatInit000();
	stdlib_algorithmDatInit000();
	stdlib_strutilsDatInit000();
	stdlib_hashesDatInit000();
	stdlib_tablesDatInit000();
	fibDatInit000();
	stdlib_parseutilsInit000();
	stdlib_mathInit000();
	stdlib_algorithmInit000();
	stdlib_strutilsInit000();
	stdlib_hashesInit000();
	stdlib_tablesInit000();
}

void PreMain(void) {
	void (*volatile inner)(void);
	systemDatInit000();
	inner = PreMainInner;
	initStackBottomWith((void *)&inner);
	(*inner)();
}

int cmdCount;
char** cmdLine;
char** gEnv;
N_CDECL(void, NimMainInner)(void) {
	NimMainModule();
}

N_CDECL(void, NimMain)(void) {
	void (*volatile inner)(void);
	PreMain();
	inner = NimMainInner;
	initStackBottomWith((void *)&inner);
	(*inner)();
}

int main(int argc, char** args, char** env) {
	cmdLine = args;
	cmdCount = argc;
	gEnv = env;
	NimMain();
	return nim_program_result;
}

NIM_EXTERNC N_NOINLINE(void, NimMainModule)(void) {
	nimfr_("fib", "fib.nim");
	nimln_(32, "fib.nim");
	main_rgIXYCi0KHcWjySNuM4lTg();
	popFrame();
}

NIM_EXTERNC N_NOINLINE(void, fibDatInit000)(void) {
}

