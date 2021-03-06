/* Generated by Nim Compiler v0.18.0 */
/*   (c) 2018 Andreas Rumpf */
/* The generated code is subject to the original license. */
/* Compiled for: MacOSX, amd64, clang */
/* Command for C compiler:
   clang -c  -w  -I/Users/alextanhongpin/.choosenim/toolchains/nim-0.18.0/lib -o /Users/alextanhongpin/Documents/architecture/data-structures-and-algorithms/fibonacci/nim/src/nimcache/stdlib_strutils.o /Users/alextanhongpin/Documents/architecture/data-structures-and-algorithms/fibonacci/nim/src/nimcache/stdlib_strutils.c */
#define NIM_NEW_MANGLING_RULES
#define NIM_INTBITS 64

#include "nimbase.h"
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
typedef struct NimStringDesc NimStringDesc;
typedef struct TGenericSeq TGenericSeq;
typedef struct tyObject_HSlice_x7qpDivRIi6zcMSMsudNPA tyObject_HSlice_x7qpDivRIi6zcMSMsudNPA;
typedef struct tyObject_HSlice_lKy9cDUCgy9ap43jXru18mYw tyObject_HSlice_lKy9cDUCgy9ap43jXru18mYw;
struct TGenericSeq {
NI len;
NI reserved;
};
struct NimStringDesc {
  TGenericSeq Sup;
NIM_CHAR data[SEQ_DECL_SIZE];
};
struct tyObject_HSlice_x7qpDivRIi6zcMSMsudNPA {
NI a;
NI b;
};
struct tyObject_HSlice_lKy9cDUCgy9ap43jXru18mYw {
NI a;
NI b;
};
N_LIB_PRIVATE N_NIMCALL(void, reverse_LoixoqZetR6FfezoPedx8w)(NimStringDesc** a, NI aLen_0);
N_LIB_PRIVATE N_NIMCALL(void, reverse_XQiN4wExsmIg8NFBmG3ObA)(NimStringDesc** a, NI aLen_0, NI first, NI last);
N_LIB_PRIVATE N_NIMCALL(void, X5BX5Deq__S9coE9cSZKnhx2dOL8sov4fQ)(NimStringDesc** s, tyObject_HSlice_x7qpDivRIi6zcMSMsudNPA x, NimStringDesc* b);
static N_INLINE(NimStringDesc*, X5BX5D__xiaaX9b4cczHG39bivOynT9bgstrutils)(NimStringDesc* s, tyObject_HSlice_x7qpDivRIi6zcMSMsudNPA x);
static N_INLINE(NI, subInt)(NI a, NI b);
N_NOINLINE(void, raiseOverflow)(void);
static N_INLINE(NI, addInt)(NI a, NI b);
N_NIMCALL(NimStringDesc*, mnewString)(NI len);
N_NIMCALL(NimStringDesc*, mnewString)(NI len);
static N_INLINE(NI, chckRange)(NI i, NI a, NI b);
N_NOINLINE(void, raiseRangeError)(NI64 val);
N_NOINLINE(void, raiseIndexError)(void);
static N_INLINE(void, nimFrame)(TFrame* s);
N_LIB_PRIVATE N_NOINLINE(void, stackOverflow_II46IjNZztN9bmbxUD8dt8g)(void);
static N_INLINE(void, popFrame)(void);
static N_INLINE(NimStringDesc*, X5BX5D__lkBUIkH7j2jb0vaXPf2frAstrutils)(NimStringDesc* s, tyObject_HSlice_x7qpDivRIi6zcMSMsudNPA x);
static N_INLINE(NIM_BOOL, contains_I9cy9aN2znlBRynMcXN4pBGgstrutils)(NIM_CHAR* a, NI aLen_0, NIM_CHAR item);
static N_INLINE(NI, find_b3HPX1XboPhUmnxkTjazFQstrutils)(NIM_CHAR* a, NI aLen_0, NIM_CHAR item);
static N_INLINE(NIM_BOOL, contains_MCIiD5bOOJHgEOw1G9anbFQstrutils)(tyObject_HSlice_lKy9cDUCgy9ap43jXru18mYw s, NI value);
N_LIB_PRIVATE N_NIMCALL(NF, round_FL9bhksfuQsfLDCxRHuknsg)(NF x, NI places);
static N_INLINE(void, stareq__7kHiltrvRlcg6wSYR3CxAwstrutils)(NF* x, NF y);
static N_INLINE(void, pluseq__7kHiltrvRlcg6wSYR3CxAw_2strutils)(NF* x, NF y);
extern TFrame* framePtr_HRfVMH3jYeBJz6Q6X9b6Ptw;

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

static N_INLINE(NI, chckRange)(NI i, NI a, NI b) {
	NI result;
{	result = (NI)0;
	{
		NIM_BOOL T3_;
		T3_ = (NIM_BOOL)0;
		T3_ = (a <= i);
		if (!(T3_)) goto LA4_;
		T3_ = (i <= b);
		LA4_: ;
		if (!T3_) goto LA5_;
		result = i;
		goto BeforeRet_;
	}
	goto LA1_;
	LA5_: ;
	{
		raiseRangeError(((NI64) (i)));
	}
	LA1_: ;
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

static N_INLINE(NimStringDesc*, X5BX5D__xiaaX9b4cczHG39bivOynT9bgstrutils)(NimStringDesc* s, tyObject_HSlice_x7qpDivRIi6zcMSMsudNPA x) {
	NimStringDesc* result;
	NI a;
	NI L;
	NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_2;
	NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_3;
	nimfr_("[]", "system.nim");
	result = (NimStringDesc*)0;
	nimln_(3556, "system.nim");
	a = x.a;
	nimln_(3557, "system.nim");
	nimln_(3546, "system.nim");
	TM_JGc9b9bh2D3nTdUR7TGyq8aA_2 = subInt(x.b, a);
	TM_JGc9b9bh2D3nTdUR7TGyq8aA_3 = addInt((NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_2), ((NI) 1));
	L = (NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_3);
	nimln_(3558, "system.nim");
	result = mnewString(((NI)chckRange(L, ((NI) 0), ((NI) IL64(9223372036854775807)))));
	{
		NI i;
		NI i_2;
		i = (NI)0;
		nimln_(3519, "system.nim");
		i_2 = ((NI) 0);
		{
			nimln_(3520, "system.nim");
			while (1) {
				NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_4;
				NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_5;
				if (!(i_2 < L)) goto LA3;
				nimln_(3521, "system.nim");
				i = i_2;
				if ((NU)(i) > (NU)(result->Sup.len)) raiseIndexError();
				nimln_(3559, "system.nim");
				TM_JGc9b9bh2D3nTdUR7TGyq8aA_4 = addInt(i, a);
				if ((NU)((NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_4)) > (NU)(s->Sup.len)) raiseIndexError();
				result->data[i] = s->data[(NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_4)];
				nimln_(3522, "system.nim");
				TM_JGc9b9bh2D3nTdUR7TGyq8aA_5 = addInt(i_2, ((NI) 1));
				i_2 = (NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_5);
			} LA3: ;
		}
	}
	popFrame();
	return result;
}

static N_INLINE(NimStringDesc*, X5BX5D__lkBUIkH7j2jb0vaXPf2frAstrutils)(NimStringDesc* s, tyObject_HSlice_x7qpDivRIi6zcMSMsudNPA x) {
	NimStringDesc* result;
	NI a;
	NI L;
	NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_6;
	NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_7;
	NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_8;
	nimfr_("[]", "system.nim");
	result = (NimStringDesc*)0;
	nimln_(3556, "system.nim");
	a = x.a;
	nimln_(3557, "system.nim");
	nimln_(3546, "system.nim");
	nimln_(3557, "system.nim");
	TM_JGc9b9bh2D3nTdUR7TGyq8aA_6 = subInt((s ? s->Sup.len : 0), x.b);
	TM_JGc9b9bh2D3nTdUR7TGyq8aA_7 = subInt((NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_6), a);
	TM_JGc9b9bh2D3nTdUR7TGyq8aA_8 = addInt((NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_7), ((NI) 1));
	L = (NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_8);
	nimln_(3558, "system.nim");
	result = mnewString(((NI)chckRange(L, ((NI) 0), ((NI) IL64(9223372036854775807)))));
	{
		NI i;
		NI i_2;
		i = (NI)0;
		nimln_(3519, "system.nim");
		i_2 = ((NI) 0);
		{
			nimln_(3520, "system.nim");
			while (1) {
				NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_9;
				NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_10;
				if (!(i_2 < L)) goto LA3;
				nimln_(3521, "system.nim");
				i = i_2;
				if ((NU)(i) > (NU)(result->Sup.len)) raiseIndexError();
				nimln_(3559, "system.nim");
				TM_JGc9b9bh2D3nTdUR7TGyq8aA_9 = addInt(i, a);
				if ((NU)((NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_9)) > (NU)(s->Sup.len)) raiseIndexError();
				result->data[i] = s->data[(NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_9)];
				nimln_(3522, "system.nim");
				TM_JGc9b9bh2D3nTdUR7TGyq8aA_10 = addInt(i_2, ((NI) 1));
				i_2 = (NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_10);
			} LA3: ;
		}
	}
	popFrame();
	return result;
}

static N_INLINE(NI, find_b3HPX1XboPhUmnxkTjazFQstrutils)(NIM_CHAR* a, NI aLen_0, NIM_CHAR item) {
	NI result;
	nimfr_("find", "system.nim");
{	result = (NI)0;
	{
		NIM_CHAR i;
		NI i_2;
		i = (NIM_CHAR)0;
		nimln_(2185, "system.nim");
		i_2 = ((NI) 0);
		{
			nimln_(2186, "system.nim");
			while (1) {
				NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_11;
				NI TM_JGc9b9bh2D3nTdUR7TGyq8aA_12;
				if (!(i_2 < aLen_0)) goto LA3;
				nimln_(2187, "system.nim");
				if ((NU)(i_2) >= (NU)(aLen_0)) raiseIndexError();
				i = a[i_2];
				nimln_(2419, "system.nim");
				{
					if (!((NU8)(i) == (NU8)(item))) goto LA6_;
					goto BeforeRet_;
				}
				LA6_: ;
				nimln_(2420, "system.nim");
				TM_JGc9b9bh2D3nTdUR7TGyq8aA_11 = addInt(result, ((NI) 1));
				result = (NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_11);
				nimln_(2188, "system.nim");
				TM_JGc9b9bh2D3nTdUR7TGyq8aA_12 = addInt(i_2, ((NI) 1));
				i_2 = (NI)(TM_JGc9b9bh2D3nTdUR7TGyq8aA_12);
			} LA3: ;
		}
	}
	nimln_(2421, "system.nim");
	result = ((NI) -1);
	}BeforeRet_: ;
	popFrame();
	return result;
}

static N_INLINE(NIM_BOOL, contains_I9cy9aN2znlBRynMcXN4pBGgstrutils)(NIM_CHAR* a, NI aLen_0, NIM_CHAR item) {
	NIM_BOOL result;
	NI T1_;
	nimfr_("contains", "system.nim");
{	result = (NIM_BOOL)0;
	nimln_(2426, "system.nim");
	T1_ = (NI)0;
	T1_ = find_b3HPX1XboPhUmnxkTjazFQstrutils(a, aLen_0, item);
	result = (((NI) 0) <= T1_);
	goto BeforeRet_;
	}BeforeRet_: ;
	popFrame();
	return result;
}

static N_INLINE(NIM_BOOL, contains_MCIiD5bOOJHgEOw1G9anbFQstrutils)(tyObject_HSlice_lKy9cDUCgy9ap43jXru18mYw s, NI value) {
	NIM_BOOL result;
	NIM_BOOL T1_;
	nimfr_("contains", "system.nim");
	result = (NIM_BOOL)0;
	nimln_(1204, "system.nim");
	T1_ = (NIM_BOOL)0;
	T1_ = (((NI) (s.a)) <= value);
	if (!(T1_)) goto LA2_;
	T1_ = (value <= ((NI) (s.b)));
	LA2_: ;
	result = T1_;
	popFrame();
	return result;
}

static N_INLINE(void, stareq__7kHiltrvRlcg6wSYR3CxAwstrutils)(NF* x, NF y) {
	nimfr_("*=", "system.nim");
	nimln_(3710, "system.nim");
	(*x) = ((NF)((*x)) * (NF)(y));
	popFrame();
}

static N_INLINE(void, pluseq__7kHiltrvRlcg6wSYR3CxAw_2strutils)(NF* x, NF y) {
	nimfr_("+=", "system.nim");
	nimln_(3700, "system.nim");
	(*x) = ((NF)((*x)) + (NF)(y));
	popFrame();
}
NIM_EXTERNC N_NOINLINE(void, stdlib_strutilsInit000)(void) {
	nimfr_("strutils", "strutils.nim");
	popFrame();
}

NIM_EXTERNC N_NOINLINE(void, stdlib_strutilsDatInit000)(void) {
}

