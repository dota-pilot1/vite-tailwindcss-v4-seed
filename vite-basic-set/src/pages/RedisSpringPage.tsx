import type React from "react";
import {
  Server,
  Layers,
  Database,
  Settings,
  CheckCircle,
  ExternalLink,
  Code,
  Target,
  Link as LinkIcon,
} from "lucide-react";

const RedisSpringPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
              <Server className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Spring Boot에서 Redis 활용
              </h1>
              <p className="text-gray-600 mt-2">
                Spring Data Redis를 활용한 효율적인 캐싱과 데이터 저장
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 컨텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Spring Data Redis 설정 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-600" />
                Spring Data Redis 설정
              </h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    의존성 추가
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                    &lt;dependency&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
                    <br />
                    &lt;/dependency&gt;
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    application.yml 설정
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                    spring:
                    <br />
                    &nbsp;&nbsp;redis:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;host: localhost
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;port: 6379
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;password: mypassword
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;timeout: 2000ms
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;jedis:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pool:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-active:
                    8<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max-idle: 8
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min-idle: 0
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Redis 설정 클래스
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                    @Configuration
                    <br />
                    @EnableRedisRepositories
                    <br />
                    public class RedisConfig {"{"}
                    <br />
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;@Bean
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;public RedisTemplate&lt;String,
                    Object&gt; redisTemplate(
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LettuceConnectionFactory
                    connectionFactory) {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RedisTemplate&lt;String,
                    Object&gt; template = new RedisTemplate&lt;&gt;();
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;template.setConnectionFactory(connectionFactory);
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;template.setDefaultSerializer(new
                    GenericJackson2JsonRedisSerializer());
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return
                    template;
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{"}"}
                    <br />
                    {"}"}
                  </div>
                </div>
              </div>
            </div>

            {/* 캐싱 어노테이션 활용 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Layers className="w-6 h-6 text-purple-600" />
                Spring Cache 어노테이션
              </h2>
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    @Cacheable - 조회 캐싱
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono mb-3">
                    @Service
                    <br />
                    public class UserService {"{"}
                    <br />
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;@Cacheable(value = "users", key =
                    "#id")
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;public User findById(Long id) {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return
                    userRepository.findById(id);
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;{"}"}
                    <br />
                    {"}"}
                  </div>
                  <p className="text-sm text-gray-600">
                    메서드 결과를 캐시에 저장하고, 동일한 파라미터로 호출 시
                    캐시에서 반환
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    @CachePut - 업데이트 캐싱
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono mb-3">
                    @CachePut(value = "users", key = "#user.id")
                    <br />
                    public User updateUser(User user) {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;return userRepository.save(user);
                    <br />
                    {"}"}
                  </div>
                  <p className="text-sm text-gray-600">
                    메서드를 실행하고 결과를 캐시에 저장 (캐시 갱신)
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    @CacheEvict - 캐시 제거
                  </h3>
                  <div className="bg-gray-50 rounded p-3 text-sm font-mono mb-3">
                    @CacheEvict(value = "users", key = "#id")
                    <br />
                    public void deleteUser(Long id) {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;userRepository.deleteById(id);
                    <br />
                    {"}"}
                  </div>
                  <p className="text-sm text-gray-600">
                    지정된 키의 캐시 데이터 제거
                  </p>
                </div>
              </div>
            </div>

            {/* RedisTemplate 활용 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-green-600" />
                RedisTemplate 활용
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      String 데이터 처리
                    </h3>
                    <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                      @Autowired
                      <br />
                      private RedisTemplate redisTemplate;
                      <br />
                      <br />
                      // 저장
                      <br />
                      redisTemplate.opsForValue()
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.set("key", "value",
                      Duration.ofHours(1));
                      <br />
                      <br />
                      // 조회
                      <br />
                      String value = (String) redisTemplate
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.opsForValue().get("key");
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Hash 데이터 처리
                    </h3>
                    <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                      // Hash 저장
                      <br />
                      redisTemplate.opsForHash()
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.put("user:1", "name", "John");
                      <br />
                      redisTemplate.opsForHash()
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.put("user:1", "age", "30");
                      <br />
                      <br />
                      // Hash 조회
                      <br />
                      Map userMap = redisTemplate
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.opsForHash().entries("user:1");
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      List 데이터 처리
                    </h3>
                    <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                      // List 추가
                      <br />
                      redisTemplate.opsForList()
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.rightPush("queue", "task1");
                      <br />
                      <br />
                      // List 조회
                      <br />
                      String task = (String) redisTemplate
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.opsForList().leftPop("queue");
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Sorted Set 활용
                    </h3>
                    <div className="bg-gray-50 rounded p-3 text-sm font-mono">
                      // 점수와 함께 추가
                      <br />
                      redisTemplate.opsForZSet()
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.add("leaderboard", "player1",
                      100.0);
                      <br />
                      <br />
                      // 상위 10명 조회
                      <br />
                      Set&lt;String&gt; top10 = redisTemplate
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;.opsForZSet().reverseRange("leaderboard",
                      0, 9);
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 실전 활용 예제 */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-orange-600" />
                실전 활용 예제
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">
                    세션 클러스터링
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Spring Session Redis를 통한 분산 세션 관리
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">API 응답 캐싱</h3>
                  <p className="text-gray-600 text-sm">
                    자주 조회되는 API 응답을 캐시하여 성능 향상
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">실시간 알림</h3>
                  <p className="text-gray-600 text-sm">
                    Redis Pub/Sub을 활용한 실시간 알림 시스템
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-800">분산 락</h3>
                  <p className="text-gray-600 text-sm">
                    Redisson을 활용한 분산 환경에서의 동시성 제어
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 설정 체크리스트 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                설정 체크리스트
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Redis 서버 설치</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">
                    Spring Data Redis 의존성
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">
                    Connection Factory 설정
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">
                    RedisTemplate Bean 등록
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">
                    @EnableCaching 어노테이션
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Serializer 설정</span>
                </div>
              </div>
            </div>

            {/* 성능 최적화 팁 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                성능 최적화
              </h3>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    Connection Pool 튜닝
                  </h4>
                  <p className="text-xs text-gray-600">
                    적절한 풀 크기 설정으로 성능 향상
                  </p>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    적절한 TTL 설정
                  </h4>
                  <p className="text-xs text-gray-600">
                    메모리 효율성을 위한 만료 시간
                  </p>
                </div>
                <div className="border border-gray-200 rounded p-3">
                  <h4 className="font-semibold text-sm text-gray-800">
                    캐시 워밍
                  </h4>
                  <p className="text-xs text-gray-600">
                    애플리케이션 시작 시 캐시 미리 로드
                  </p>
                </div>
              </div>
            </div>

            {/* 참고 자료 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-blue-600" />
                참고 자료
              </h3>
              <div className="space-y-3">
                <a
                  href="https://spring.io/projects/spring-data-redis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Spring Data Redis
                </a>
                <a
                  href="https://spring.io/projects/spring-session"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Spring Session Redis
                </a>
                <a
                  href="https://github.com/redisson/redisson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Code className="w-4 h-4" />
                  Redisson Java Client
                </a>
                <a
                  href="https://docs.spring.io/spring-framework/reference/integration/cache.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Spring Cache Abstraction
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedisSpringPage;
