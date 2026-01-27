# Coolify Deployment Guide - R36S Game List

Bu rehber, R36S Game List web sitesini Coolify üzerinde deploy etmek için adım adım talimatlar içerir.

## Gereksinimler

- Coolify kurulumu yapılmış olmalı
- GitHub repository'ye erişim
- Domain: `r36sgamelist.com` (veya kendi domain'iniz)

## Deployment Adımları

### 1. Coolify'da Yeni Uygulama Oluşturma

1. Coolify dashboard'una giriş yapın
2. "New Resource" veya "New Application" butonuna tıklayın
3. "GitHub" seçeneğini seçin

### 2. Repository Bağlama

1. GitHub hesabınızı bağlayın (eğer bağlı değilse)
2. Repository listesinden `kerembasbug/r36s-game-list` seçin
3. Branch: `main` seçin

### 3. Build Ayarları

**Build Pack:** Nixpacks (otomatik algılanır)  
**Build Command:** `npm install && npm run build`  
**Start Command:** `sh start.sh` veya `node .next/standalone/server.js`  
**Port:** `3000` (otomatik olarak PORT environment variable'ı ayarlanır)

### 4. Environment Variables

Coolify dashboard'unda "Environment Variables" sekmesine gidin ve şunları ekleyin:

| Variable | Value | Açıklama |
|----------|-------|----------|
| `NODE_ENV` | `production` | Production modu (zorunlu) |
| `NEXT_PUBLIC_SITE_URL` | `https://r36sgamelist.com` | Site URL'i (canonical URLs ve hreflang için) |
| `PORT` | `3000` | Uygulama portu (Coolify otomatik ayarlar) |
| `HOSTNAME` | `0.0.0.0` | **KRİTİK:** Server'ın tüm interface'lere bind olması için (502 hatası önleme) |

**Önemli:** 
- `NEXT_PUBLIC_SITE_URL` değişkenini kendi domain'inizle değiştirin.
- **`HOSTNAME=0.0.0.0` MUTLAKA ayarlanmalı** - Aksi halde 502 Bad Gateway hatası alırsınız.

### 5. Port Ayarları

- **Ports Exposes:** `3000`
- **Ports Mappings:** `3000:3000`
- Coolify otomatik olarak PORT environment variable'ını ayarlar

### 6. Domain Ayarlama

1. "Domains" sekmesine gidin
2. Domain ekleyin: `r36sgamelist.com`
3. SSL sertifikası otomatik olarak Let's Encrypt ile oluşturulur

### 7. Container Labels (Traefik/Caddy)

Coolify otomatik olarak Traefik veya Caddy label'larını oluşturur. Eğer manuel ayarlama gerekiyorsa:

#### Traefik Labels (Önerilen)

```
traefik.enable=true
traefik.http.middlewares.gzip.compress=true
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
traefik.http.routers.http-0-xxx.entryPoints=http
traefik.http.routers.http-0-xxx.middlewares=redirect-to-https
traefik.http.routers.http-0-xxx.rule=Host(`r36sgamelist.com`) && PathPrefix('/')
traefik.http.routers.http-0-xxx.service=http-0-xxx
traefik.http.routers.https-0-xxx.entryPoints=https
traefik.http.routers.https-0-xxx.middlewares=gzip
traefik.http.routers.https-0-xxx.rule=Host(`r36sgamelist.com`) && PathPrefix('/')
traefik.http.routers.https-0-xxx.service=https-0-xxx
traefik.http.routers.https-0-xxx.tls.certresolver=letsencrypt
traefik.http.routers.https-0-xxx.tls=true
traefik.http.services.http-0-xxx.loadbalancer.server.port=3000
traefik.http.services.https-0-xxx.loadbalancer.server.port=3000
```

#### Caddy Labels (Alternatif)

```
caddy_0.encode=zstd gzip
caddy_0.handle_path.0_reverse_proxy={{upstreams 3000}}
caddy_0.handle_path=/*
caddy_0.header=-Server
caddy_0.try_files={path} /index.html
caddy_0=https://r36sgamelist.com
caddy_ingress_network=coolify
```

**Not:** Coolify genellikle bu label'ları otomatik oluşturur. Manuel ekleme gerekmez.

### 8. Deploy

1. "Deploy" butonuna tıklayın
2. Build işlemi başlayacak (5-10 dakika sürebilir)
3. Build tamamlandığında uygulama otomatik olarak başlatılacak

## Build Süreci

Build sırasında şunlar olur:

1. **Install Phase:** `npm install` - Bağımlılıklar yüklenir
2. **Build Phase:** `npm run build` - Next.js production build oluşturulur
   - Standalone output modu kullanılır
   - `src/data/games.json` otomatik olarak dahil edilir
3. **Start Phase:** `sh start.sh` - Uygulama başlatılır
   - Static files `.next/standalone/.next/static` dizinine kopyalanır
   - `games.json` standalone dizinine kopyalanır
   - Server `0.0.0.0:3000` adresinde başlatılır

## Önemli Notlar

### Standalone Mode

- Next.js `standalone` output modu kullanılıyor
- Sadece gerekli dosyalar deploy edilir
- `start.sh` script'i static files'ı doğru yere kopyalar
- `games.json` otomatik olarak standalone dizinine kopyalanır

### i18n (Çoklu Dil Desteği)

- 15 dil desteği aktif
- Geolocation bazlı otomatik dil algılama
- Hreflang tags SEO için optimize edilmiş
- Content-Language header otomatik eklenir

### SEO Optimizasyonu

- Hreflang tags (15 dil)
- Canonical URLs
- Structured Data (JSON-LD)
- Sitemap ve robots.txt
- Meta tags optimize edilmiş

## Troubleshooting

### Build Başarısız Olursa

1. Build loglarını kontrol edin
2. Node.js versiyonunu kontrol edin (20.x önerilen)
3. `package.json` dosyasının doğru olduğundan emin olun
4. `games.json` dosyasının mevcut olduğundan emin olun

### Uygulama Başlamazsa

1. Logları kontrol edin: Coolify dashboard'dan "Logs" sekmesine gidin
2. PORT environment variable'ının ayarlı olduğundan emin olun
3. `.next/standalone` klasörünün oluşturulduğundan emin olun
4. `start.sh` script'inin çalıştırılabilir olduğundan emin olun

### 502 Bad Gateway Hatası

Bu hata genellikle Next.js server'ın `localhost` (127.0.0.1) yerine `0.0.0.0`'a bind olmamasından kaynaklanır.

**Çözüm:**
1. **HOSTNAME environment variable'ını kontrol edin:**
   - Coolify dashboard'da Environment Variables sekmesine gidin
   - `HOSTNAME=0.0.0.0` olduğundan emin olun
   - Eğer yoksa ekleyin

2. **start.sh script'inin çalıştığını kontrol edin:**
   - Logs'da "Server will bind to 0.0.0.0:3000" mesajını arayın
   - "Checking and patching server.js to bind to 0.0.0.0..." mesajını kontrol edin

3. **Port mapping'i kontrol edin:**
   - Ports Exposes: `3000`
   - Ports Mappings: `3000:3000`

4. **Container'ın sağlıklı olduğundan emin olun:**
   - Health check durumunu kontrol edin
   - Container logs'da hata mesajı olup olmadığını kontrol edin

5. **Traefik/Caddy label'larını kontrol edin:**
   - `traefik.http.services.xxx.loadbalancer.server.port=3000` olduğundan emin olun

### Static Files Görünmüyor

1. `start.sh` script'inin çalıştığını kontrol edin
2. `.next/standalone/.next/static` dizininin mevcut olduğunu kontrol edin
3. Build loglarında "Copied .next/static" mesajını arayın

### Dil Değişmiyor

1. Browser cache'ini temizleyin
2. LocalStorage'ı temizleyin
3. `NEXT_PUBLIC_SITE_URL` environment variable'ının doğru olduğundan emin olun

## Monitoring

Coolify dashboard'undan şunları izleyebilirsiniz:

- CPU ve Memory kullanımı
- Loglar (real-time)
- Deployment geçmişi
- Health check durumu
- Network trafiği

## Güncelleme

Yeni bir commit push ettiğinizde:

1. Coolify otomatik olarak yeni commit'i algılar
2. Yeni bir build başlatır
3. Build başarılı olursa otomatik olarak deploy eder

Manuel deploy için:
1. Coolify dashboard'da uygulamaya gidin
2. "Redeploy" butonuna tıklayın

## Performans Optimizasyonu

### Build Optimizasyonu

- Standalone mode kullanılıyor (daha küçük image)
- Unused dependencies exclude edilmiş
- Static files optimize edilmiş

### Runtime Optimizasyonu

- Compression aktif (gzip/zstd)
- Static file caching
- Next.js Image Optimization (unoptimized mode - CDN kullanılıyorsa)

## Destek

Sorun yaşarsanız:

1. Build loglarını kontrol edin
2. Application loglarını kontrol edin
3. GitHub Issues'da sorun açın: https://github.com/kerembasbug/r36s-game-list/issues

## Hızlı Başlangıç Checklist

- [ ] Coolify'da yeni uygulama oluşturuldu
- [ ] GitHub repository bağlandı (`kerembasbug/r36s-game-list`)
- [ ] Branch seçildi (`main`)
- [ ] Build command ayarlandı (`npm install && npm run build`)
- [ ] Start command ayarlandı (`sh start.sh`)
- [ ] Port ayarlandı (`3000`)
- [ ] Environment variables eklendi:
  - [ ] `NODE_ENV=production`
  - [ ] `NEXT_PUBLIC_SITE_URL=https://r36sgamelist.com`
- [ ] Domain eklendi (`r36sgamelist.com`)
- [ ] SSL sertifikası oluşturuldu
- [ ] İlk deploy başlatıldı
- [ ] Build başarılı oldu
- [ ] Uygulama çalışıyor
- [ ] Domain erişilebilir
- [ ] SSL çalışıyor (HTTPS)

## Örnek Environment Variables

```bash
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://r36sgamelist.com
PORT=3000
HOSTNAME=0.0.0.0  # KRİTİK: 502 hatası önlemek için mutlaka 0.0.0.0 olmalı
```

**Not:** `HOSTNAME=0.0.0.0` ayarı olmadan server `localhost`'a bind olur ve Coolify/Traefik erişemez, bu da 502 Bad Gateway hatasına neden olur.

## Örnek Container Labels (Traefik)

```
traefik.enable=true
traefik.http.middlewares.gzip.compress=true
traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https
traefik.http.routers.http-0-xxx.entryPoints=http
traefik.http.routers.http-0-xxx.middlewares=redirect-to-https
traefik.http.routers.http-0-xxx.rule=Host(`r36sgamelist.com`) && PathPrefix('/')
traefik.http.routers.http-0-xxx.service=http-0-xxx
traefik.http.routers.https-0-xxx.entryPoints=https
traefik.http.routers.https-0-xxx.middlewares=gzip
traefik.http.routers.https-0-xxx.rule=Host(`r36sgamelist.com`) && PathPrefix('/')
traefik.http.routers.https-0-xxx.service=https-0-xxx
traefik.http.routers.https-0-xxx.tls.certresolver=letsencrypt
traefik.http.routers.https-0-xxx.tls=true
traefik.http.services.http-0-xxx.loadbalancer.server.port=3000
traefik.http.services.https-0-xxx.loadbalancer.server.port=3000
```

---

**Son Güncelleme:** 2025-01-06  
**Proje:** R36S Game List  
**Repository:** https://github.com/kerembasbug/r36s-game-list

